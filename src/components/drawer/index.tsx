/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function DrawerDefault({
  open,
  closeDrawer,
  linkItems,
  isActive,
}: {
  closeDrawer: any;
  open: any;
  isActive: string;
  linkItems: {
    name: string;
    href: string;
    icon: ReactNode;
    role: string[];
  }[];
}) {
  return (
    <Drawer
      open={open}
      onClose={closeDrawer}
      className="p-4"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="flex items-center justify-between mb-6">
        <Typography
          variant="h5"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Fake Hadish
        </Typography>

        <IconButton
          variant="text"
          color="blue-gray"
          onClick={closeDrawer}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IoClose size={24} />
        </IconButton>
      </div>

      <List
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {linkItems.map((doc) => (
          <Link to={doc.href} key={doc.href}>
            <ListItem
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className={`${isActive === doc.href && "text-white bg-gray-800"}`}
            >
              <ListItemPrefix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {doc.icon}
              </ListItemPrefix>
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="font-bold"
              >
                {doc.name}
              </Typography>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
