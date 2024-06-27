import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { FaBook, FaBookmark, FaUsers } from "react-icons/fa6";
import { HiPresentationChartBar } from "react-icons/hi2";
import { LiaUsersCogSolid } from "react-icons/lia";
import { toManageDashboard } from "../../../utils/constant";

const sideBarLink = [
  {
    name: "Dashboard",
    href: toManageDashboard,
    icon: <HiPresentationChartBar size={20} />,
    role: ["ADMIN", "SUPER ADMINISTRATOR"],
  },
  {
    name: "User",
    href: toManageDashboard,
    icon: <FaUsers size={20} />,
    role: ["ADMIN", "SUPER ADMINISTRATOR"],
  },
  {
    name: "Hadish",
    href: toManageDashboard,
    icon: <FaBook size={20} />,
    role: ["ADMIN", "SUPER ADMINISTRATOR"],
  },
  {
    name: "Type Hadish",
    href: toManageDashboard,
    icon: <FaBookmark size={20} />,
    role: ["ADMIN", "SUPER ADMINISTRATOR"],
  },
  {
    name: "Role",
    href: toManageDashboard,
    icon: <LiaUsersCogSolid size={20} />,
    role: ["ADMIN", "SUPER ADMINISTRATOR"],
  },
];

export default function Sidebar() {
  return (
    <Card
      className="h-[calc(100vh-2rem)] w-full max-w-72 border border-black/25 p-4 shadow-xl shadow-blue-gray-900/5 hidden lg:block"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="p-4 mb-2">
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-center"
          as="a"
          href={toManageDashboard}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Fake Hadish
        </Typography>
      </div>

      <List
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {sideBarLink.map((doc) => (
          <ListItem
            key={doc.href}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <ListItemPrefix
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {doc.icon}
            </ListItemPrefix>
            <Typography
              as="a"
              href={doc.href}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {doc.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
