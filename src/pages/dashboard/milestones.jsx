import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Input,
  Button,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled, { css } from "styled-components";

export function Milestones() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    form,
    formState: { errors }
  } = useForm({
    mode: "onChanges",
    reValidateMode: "onChange"
  });

  const onSubmit = data => {
    /// save milestone
  };

  const [milestones, setMilestones] = React.useState(1);
  const [payment, setPayment] = React.useState(100);
  const [dates, setDates] = React.useState([]);
  const paymentDates = React.useRef([]);

  const getPayment = () => {
    return parseFloat(payment / milestones).toFixed(2) || "";
  };

  const getPercent = () => {
    return parseFloat(100 / milestones).toFixed(2) || "";
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Transaction Milestone
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <br />
          <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <Input
                  label="Total Payment"
                  value={payment}
                  type={"number"}
                  min={100}
                  step={100}
                  onChange={(event) => setPayment(event.target.value)}
                />
              </div>
              <Input
                label="Number of milestones"
                value={milestones}
                type={"number"}
                min={1}
                step={1}
                onChange={(event) => {
                  const val = parseInt(event.target.value) || 1;
                  setMilestones(val)
                }}
              />

              <div className='mt-4 mb-4'>
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Milestone", "Payment", "%", "Date"].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-5 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(milestones)].map((x, i) => {
                      const dateReceived = dates[i] || new Date();
                      return (
                        <tr key={i}>
                          <td className='py-3 px-5'>
                            <div className="flex items-center gap-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold">{i + 1}</Typography>
                            </div>
                          </td>
                          <td className='py-3 px-5'>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {getPayment()}
                            </Typography>
                          </td>
                          <td className='py-3 px-5'>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {getPercent()}
                            </Typography>
                          </td>
                          <td>
                            <Controller
                              render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error },
                                formState,
                              }) => (
                                <ReactDatePicker
                                  dateFormat="d MMM yyyy"
                                  minDate={new Date()}
                                  selected={dateReceived}
                                  showTimeSelect={false}
                                  todayButton="Today"
                                  customInput={<StyledInput errors={errors} />}
                                  dropdownMode="select"
                                  isClearable={false}
                                  placeholderText="Select milestone payment date"
                                  shouldCloseOnSelect
                                  onSelect={date => {
                                    paymentDates.current[i] = date;
                                    setDates([...paymentDates.current])
                                    onChange(date);
                                  }}

                                />
                              )}
                              errors={errors}
                              control={control}
                              name={`payment-date-${i}`}
                              onChange={(event) => {
                                console.log('[TEST] selected: ', event)
                                return { value: selected };
                              }}
                            />
                          </td>
                        </tr>
                      );
                    }
                    )}
                  </tbody>
                </table>
              </div>
              <Button
                variant="gradient"
                fullWidth
                onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

const StyledInput = styled.input.attrs(props => ({
  autoComplete: "off",
  autoFocus: false
  // errors: props.errors
}))`
  background-clip: padding-box;
  background-color: #fff;
  border: 1px solid #c4cacf;
  border-radius: 0.25rem;
  box-sizing: border-box;
  display: block;
  font-size: 1rem;
  height: 3rem;
  line-height: 1.5;
  padding: 0.5rem 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    color: #9da7af;
    outline: 0;
  }

  ::-webkit-input-placeholder {
    color: #c0c0c0;
  }

  :-ms-input-placeholder {
    color: #c0c0c0;
  }

  :-moz-placeholder {
    color: #c0c0c0;
    opacity: 1;
  }

  ${({ errors }) =>
    Object.keys(errors).length !== 0 &&
    errors &&
    css`
      background: rgb(251, 236, 242);
      border-color: rgb(191, 22, 80) rgb(191, 22, 80) rgb(191, 22, 80)
        rgb(236, 89, 144);
      border-image: initial;
      border-style: solid;
      border-width: 1px 1px 1px 10px;
    `}
`;