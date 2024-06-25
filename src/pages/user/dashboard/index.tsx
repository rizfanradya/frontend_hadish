/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  Navbar,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { toSignIn, toSignUp } from "../../../utils/constant";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export default function UserDashboard({ docTitle }: { docTitle: string }) {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const signOut = useSignOut();
  const [openNav, setOpenNav] = useState(false);
  const [charactersPerIncrement, setCharactersPerIncrement] = useState(75);
  const [textareaHeight, setTextareaHeight] = useState("56px");
  const [borderRadius, setBorderRadius] = useState("99px");
  const { register, watch } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });

  useEffect(() => {
    (async () => {
      document.title = docTitle;
      updateCharactersPerIncrement();
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
      window.addEventListener("resize", updateCharactersPerIncrement);
      return () => {
        window.removeEventListener("resize", updateCharactersPerIncrement);
      };
    })();
  }, []);

  useEffect(() => {
    const searchValue = watch("search");
    const numberOfRows = Math.floor(
      searchValue.length / charactersPerIncrement
    );
    const newHeight = 56 + numberOfRows * 20;
    if (searchValue.length > 0) {
      setTextareaHeight(`${newHeight}px`);
      setBorderRadius("0px");
    } else {
      setTextareaHeight(`56px`);
      setBorderRadius("99px");
    }
  }, [watch("search")]);

  function updateCharactersPerIncrement() {
    const width = window.innerWidth;
    if (width < 640) {
      setCharactersPerIncrement(30);
    } else if (width >= 640 && width < 1024) {
      setCharactersPerIncrement(70);
    } else {
      setCharactersPerIncrement(75);
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-[#202124]">
      <Navbar
        className="max-w-screen-xl px-4 py-2 mx-auto"
        color="transparent"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex items-center justify-between text-white">
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Fake Hadish
          </Typography>

          {authHeader && authUser ? (
            <div className="hidden lg:block">
              <List
                className="p-0 mt-4 mb-6 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="white"
                  className="font-medium"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItem
                    className="flex items-center gap-2 py-2 pr-4"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Home
                  </ListItem>
                </Typography>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="white"
                  className="font-medium"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItem
                    className="flex items-center gap-2 py-2 pr-4"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Table
                  </ListItem>
                </Typography>
              </List>
            </div>
          ) : (
            ""
          )}

          <div className="hidden gap-2 lg:flex">
            {authHeader && authUser ? (
              <Typography
                className="w-full"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                placeholder={undefined}
                onClick={() => {
                  signOut();
                  window.location.reload();
                }}
              >
                <Button
                  variant="gradient"
                  size="sm"
                  color="red"
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Logout
                </Button>
              </Typography>
            ) : (
              <>
                <Typography
                  href={toSignIn}
                  as="a"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}
                >
                  <Button
                    variant="text"
                    size="sm"
                    color="white"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Sign In
                  </Button>
                </Typography>

                <Typography
                  href={toSignUp}
                  as="a"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}
                >
                  <Button
                    variant="gradient"
                    size="sm"
                    color="blue"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </>
            )}
          </div>

          <IconButton
            variant="text"
            color="white"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {openNav ? (
              <FaXmark className="w-6 h-6" strokeWidth={2} />
            ) : (
              <HiBars3 className="w-6 h-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>

        <Collapse open={openNav}>
          {authHeader && authUser ? (
            <List
              className="p-0 mt-4 mb-6 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                as="a"
                href="#"
                variant="small"
                color="white"
                className="font-medium"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItem
                  className="flex items-center gap-2 py-2 pr-4"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Home
                </ListItem>
              </Typography>
              <Typography
                as="a"
                href="#"
                variant="small"
                color="white"
                className="font-medium"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItem
                  className="flex items-center gap-2 py-2 pr-4"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Table
                </ListItem>
              </Typography>
            </List>
          ) : (
            ""
          )}

          <div className="flex items-center w-full gap-2 flex-nowrap lg:hidden">
            {authHeader && authUser ? (
              <Typography
                className="w-full"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                placeholder={undefined}
                onClick={() => {
                  signOut();
                  window.location.reload();
                }}
              >
                <Button
                  variant="gradient"
                  size="sm"
                  color="red"
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Logout
                </Button>
              </Typography>
            ) : (
              <>
                <Typography
                  href={toSignIn}
                  as="a"
                  className="w-full"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}
                >
                  <Button
                    variant="outlined"
                    size="sm"
                    color="white"
                    fullWidth
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Sign In
                  </Button>
                </Typography>

                <Typography
                  href={toSignUp}
                  as="a"
                  className="w-full"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}
                >
                  <Button
                    variant="gradient"
                    size="sm"
                    color="blue"
                    fullWidth
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </>
            )}
          </div>
        </Collapse>
      </Navbar>

      <div className="bg-[#202124] h-full text-white flex flex-col gap-8 items-center justify-center px-6 -mt-40">
        <h1 className="text-6xl font-medium">Hadish</h1>

        <div
          className={`flex w-full max-w-2xl flex-row items-center gap-2 border py-2 px-4 transition-all duration-300`}
          style={{ height: textareaHeight, borderRadius }}
        >
          <Textarea
            {...register("search")}
            resize={false}
            placeholder="Search Hadish..."
            className={`!border-0 focus:border-transparent overflow-hidden text-white transition-all duration-300`}
            containerProps={{
              className: "grid h-full",
            }}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />

          <IconButton
            color="white"
            variant="text"
            className="rounded-full"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <FaSearch size={20} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
