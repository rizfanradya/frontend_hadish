/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, useEffect, useState } from "react";
import NavbarDefault from "../navbar";
import Sidebar from "../sidebar";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { FaBook, FaUsers } from "react-icons/fa6";
import { HiPresentationChartBar } from "react-icons/hi2";
import { LiaUsersCogSolid } from "react-icons/lia";
import DrawerDefault from "../drawer";
import {
  ACCESS_TOKEN_NAME,
  DECODE_TOKEN,
  REFRESH_TOKEN,
  REFRESH_TOKEN_NAME,
  roleAdmin,
  roleExpert,
  roleSuperAdministrator,
  toAdminSetupModel,
  toAdminTableHadith,
  toAdminTableRole,
  toAdminTableTypeHadith,
  toAdminTableUser,
  toDashboard,
  toExpertTableHadithAssesment,
  toExpertTableHadithEvaluate,
  toExpertTableListHadith,
  toLandingPage,
} from "../../utils/constant";
import { IoIosPaper } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import { RiFileList2Fill } from "react-icons/ri";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { IoBook } from "react-icons/io5";
import { MdSettings } from "react-icons/md";

export function linkItems(
  sizeIcon: number = 20,
  color: string | undefined = undefined
) {
  return [
    {
      name: "Dashboard",
      href: toDashboard,
      icon: <HiPresentationChartBar size={sizeIcon} color={color} />,
      role: [roleAdmin, roleSuperAdministrator, roleExpert],
      description:
        "Provides an overview of key metrics and summaries for quick insights.",
    },
    {
      name: "User",
      href: toAdminTableUser,
      icon: <FaUsers size={sizeIcon} color={color} />,
      role: [roleSuperAdministrator],
      description:
        "Allows administrators to manage user data and information comprehensively.",
    },
    {
      name: "Hadish",
      href: toAdminTableHadith,
      icon: <FaBook size={sizeIcon} color={color} />,
      role: [roleAdmin],
      description:
        "Enables content management and provides detailed information related to Hadish.",
    },
    {
      name: "List Hadish",
      href: toExpertTableListHadith,
      icon: <RiFileList2Fill size={sizeIcon} color={color} />,
      role: [roleExpert],
      description:
        "Enables content management and provides detailed information related to Hadish.",
    },
    {
      name: "Hadish Assessment",
      href: toExpertTableHadithAssesment,
      icon: <IoIosPaper size={sizeIcon} color={color} />,
      role: [roleExpert],
      description:
        "Allows experts to evaluate and assess Hadish content for quality and relevance.",
    },
    {
      name: "Hadish Evaluation",
      href: toExpertTableHadithEvaluate,
      icon: <BsBookmarkCheckFill size={sizeIcon} color={color} />,
      role: [roleExpert],
      description:
        "Allows experts to evaluate and assess Hadish content for quality and relevance.",
    },
    {
      name: "Type Hadish",
      href: toAdminTableTypeHadith,
      icon: <IoBook size={sizeIcon} color={color} />,
      role: [roleAdmin],
      description:
        "Facilitates the management of categories and types within the Hadish content.",
    },
    {
      name: "Role",
      href: toAdminTableRole,
      icon: <LiaUsersCogSolid size={sizeIcon} color={color} />,
      role: [roleSuperAdministrator],
      description:
        "Handles the administration of user roles and permissions within the system.",
    },
    {
      name: "Model",
      href: toAdminSetupModel,
      icon: <MdSettings size={sizeIcon} color={color} />,
      role: [roleAdmin],
      description: "Handles the administration of model within the system.",
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
        const timeoutId = setTimeout(async () => {
          try {
            const response = await axiosInstance.post(
              `/refresh_token/${REFRESH_TOKEN}`
            );
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.access_token);
            localStorage.setItem(
              REFRESH_TOKEN_NAME,
              response.data.refresh_token
            );
            window.location.reload();
          } catch (error) {
            signOut();
            window.location.href = toLandingPage;
          }
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
    window.location.href = toLandingPage;
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
