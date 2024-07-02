/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, useEffect, useState } from "react";
import NavbarDefault from "../navbar";
import Sidebar from "../sidebar";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { FaBook, FaBookmark, FaUsers } from "react-icons/fa6";
import { HiPresentationChartBar } from "react-icons/hi2";
import { LiaUsersCogSolid } from "react-icons/lia";
import DrawerDefault from "../drawer";
import {
  DECODE_TOKEN,
  roleAdmin,
  roleExpert,
  roleSuperAdministrator,
  toAdminTableHadith,
  toAdminTableRole,
  toAdminTableTypeHadith,
  toAdminTableUser,
  toExpertTableHadith,
  toExpertTableHadithAssesment,
  toManageDashboard,
  toUserDashboard,
} from "../../utils/constant";
import { IoIosPaper } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import { RiFileList2Fill } from "react-icons/ri";

export function linkItems(
  sizeIcon: number = 20,
  color: string | undefined = undefined
) {
  return [
    {
      name: "Dashboard",
      href: toManageDashboard,
      icon: <HiPresentationChartBar size={sizeIcon} color={color} />,
      role: [roleAdmin, roleSuperAdministrator, roleExpert],
      description:
        "Provides an overview of key metrics and summaries for quick insights.",
    },
    {
      name: "User",
      href: toAdminTableUser,
      icon: <FaUsers size={sizeIcon} color={color} />,
      role: [roleAdmin, roleSuperAdministrator],
      description:
        "Allows administrators to manage user data and information comprehensively.",
    },
    {
      name: "Hadish",
      href: toAdminTableHadith,
      icon: <FaBook size={sizeIcon} color={color} />,
      role: [roleAdmin, roleSuperAdministrator],
      description:
        "Enables content management and provides detailed information related to Hadish.",
    },
    {
      name: "List Hadish",
      href: toExpertTableHadith,
      icon: <RiFileList2Fill size={sizeIcon} color={color} />,
      role: [roleSuperAdministrator, roleExpert],
      description:
        "Enables content management and provides detailed information related to Hadish.",
    },
    {
      name: "Hadish Assessment",
      href: toExpertTableHadithAssesment,
      icon: <IoIosPaper size={sizeIcon} color={color} />,
      role: [roleExpert, roleSuperAdministrator],
      description:
        "Allows experts to evaluate and assess Hadish content for quality and relevance.",
    },
    {
      name: "Type Hadish",
      href: toAdminTableTypeHadith,
      icon: <FaBookmark size={sizeIcon} color={color} />,
      role: [roleAdmin, roleSuperAdministrator],
      description:
        "Facilitates the management of categories and types within the Hadish content.",
    },
    {
      name: "Role",
      href: toAdminTableRole,
      icon: <LiaUsersCogSolid size={sizeIcon} color={color} />,
      role: [roleAdmin, roleSuperAdministrator],
      description:
        "Handles the administration of user roles and permissions within the system.",
    },
  ];
}

export default function Layout({
  children,
  isActive,
  className = "",
  title,
}: {
  children: ReactNode;
  isActive: string;
  className?: string;
  title: string;
}) {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const signOut = useSignOut();
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [userInfo, setUserInfo] = useState({ username: "", role_name: "" });

  useEffect(() => {
    if (authHeader && authUser) {
      const decodedToken = jwtDecode(authHeader);
      if (decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeToExpire = decodedToken.exp - currentTime;
        const timeoutId = setTimeout(() => {
          signOut();
          window.location.href = toUserDashboard;
        }, timeToExpire * 1000);
        return () => clearTimeout(timeoutId);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(`/user/${DECODE_TOKEN?.id}`);
        setUserInfo(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Server Error 404",
          allowOutsideClick: false,
        });
      }
    })();
  }, []);

  const filteredLinkItems = linkItems().filter((item) =>
    item.role.includes(userInfo.role_name)
  );

  if (!authHeader && !authUser) {
    window.location.href = toUserDashboard;
  } else
    return (
      <div className="relative flex gap-4 px-2 py-4 md:px-4 bg-blue-gray-50/50">
        <Sidebar linkItems={filteredLinkItems} isActive={isActive} />
        <DrawerDefault
          linkItems={filteredLinkItems}
          open={open}
          closeDrawer={closeDrawer}
          isActive={isActive}
        />

        <div className="justify-end w-full lg:flex">
          <div className="lg:w-[69%] xl:w-[73%] 2xl:w-[77%]">
            <NavbarDefault
              title={title}
              openDrawer={openDrawer}
              username={userInfo.username}
            />
            <div className={`${className} mt-24`}>{children}</div>
          </div>
        </div>
      </div>
    );
}
