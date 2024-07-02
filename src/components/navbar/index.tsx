/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useState } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { HiOutlineChevronDown } from "react-icons/hi";
import { HiMiniPower } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { toUserDashboard } from "../../utils/constant";

export default function NavbarDefault({
  openDrawer,
  title,
  username,
}: {
  openDrawer: any;
  title: string;
  username: string;
}) {
  const signOut = useSignOut();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className="fixed z-10 top-4 max-w-screen-xl px-2 py-2 mx-auto lg:px-8 lg:py-4 h-min w-[calc(100vw-18px)] lg:w-[67%] xl:w-[71%] 2xl:w-[75%]"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="container flex items-center justify-between mx-auto text-blue-gray-900">
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="px-4 font-bold"
        >
          {title}
        </Typography>

        <div className="flex items-center gap-2">
          <IconButton
            variant="text"
            className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => {
              openDrawer();
            }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <FiMenu size={22} />
          </IconButton>

          <div className="flex items-center gap-x-1">
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <FaUserCircle size={26} />
                  <HiOutlineChevronDown
                    strokeWidth={2.5}
                    className={`h-3 w-3 transition-transform ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </MenuHandler>

              <MenuList
                className="p-1"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <MenuItem
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}
                >
                  <Typography
                    variant="small"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {username}
                  </Typography>
                </MenuItem>

                <MenuItem
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}
                  onClick={() => {
                    signOut();
                    window.location.href = toUserDashboard;
                  }}
                >
                  <Typography
                    variant="small"
                    className="flex items-center gap-2 font-normal"
                    color="red"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <HiMiniPower size={18} />
                    Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
