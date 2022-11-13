import { BellIcon } from "@heroicons/react/24/solid";
import { Milestones } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <BellIcon {...icon} />,
        name: "milestones",
        path: "/milestones",
        element: <Milestones />,
      },
    ],
  }
];

export default routes;
