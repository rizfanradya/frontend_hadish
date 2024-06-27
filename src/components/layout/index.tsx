import { ReactNode, useState } from "react";
import NavbarDefault from "../navbar";
import Sidebar from "../sidebar";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { FaBook, FaBookmark, FaUsers } from "react-icons/fa6";
import { HiPresentationChartBar } from "react-icons/hi2";
import { LiaUsersCogSolid } from "react-icons/lia";
import DrawerDefault from "../drawer";
import { toManageDashboard, toUserDashboard } from "../../utils/constant";

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

export default function Layout({
  children,
  isActive,
}: {
  children: ReactNode;
  isActive: string;
}) {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  if (!authHeader && !authUser) {
    window.location.href = toUserDashboard;
  } else
    return (
      <div className="bg-blue-gray-50/50">
        <div className="flex gap-4 px-2 py-4 md:px-4">
          <Sidebar sideBarLink={sideBarLink} isActive={isActive} />
          <NavbarDefault openDrawer={openDrawer} />
          <DrawerDefault
            sideBarLink={sideBarLink}
            open={open}
            closeDrawer={closeDrawer}
            isActive={isActive}
          />
        </div>

        <div>{children}</div>
      </div>
    );
}
