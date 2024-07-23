import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { toLandingPage } from "../../utils/constant";

export default function Sidebar({
  linkItems,
  isActive,
}: {
  isActive: string;
  linkItems: {
    name: string;
    href: string;
    icon: ReactNode;
    role: string[];
  }[];
}) {
  return (
    <Card
      className="h-[calc(100vh-2rem)] fixed z-10 w-full max-w-72 border border-black/25 p-4 shadow-xl shadow-blue-gray-900/5 hidden lg:block"
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
          href={toLandingPage}
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
        {linkItems.map((doc) => (
          <Link to={doc.href} key={doc.href}>
            <ListItem
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className={`${isActive === doc.href && "text-white bg-black"}`}
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
    </Card>
  );
}
