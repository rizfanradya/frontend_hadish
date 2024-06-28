/* eslint-disable react-refresh/only-export-components */
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

export const linkItems = [
  {
    name: "Dashboard",
    href: toManageDashboard,
    icon: <HiPresentationChartBar size={20} />,
    role: ["ADMIN", "SUPER ADMINISTRATOR", "EXPERT"],
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
    role: ["ADMIN", "SUPER ADMINISTRATOR", "EXPERT"],
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
  className,
}: {
  children: ReactNode;
  isActive: string;
  className: string;
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
        <div className="relative flex gap-4 px-2 py-4 md:px-4">
          <Sidebar linkItems={linkItems} isActive={isActive} />
          <DrawerDefault
            linkItems={linkItems}
            open={open}
            closeDrawer={closeDrawer}
            isActive={isActive}
          />

          <div className="justify-end w-full lg:flex">
            <div className="lg:w-[69%] xl:w-[73%] 2xl:w-[77%]">
              <NavbarDefault openDrawer={openDrawer} />
              <div className={className}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
}
