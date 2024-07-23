/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  CardBody,
  Collapse,
  Dialog,
  IconButton,
  Input,
  List,
  ListItem,
  Navbar,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaInfoCircle, FaRegCheckCircle, FaSearch } from "react-icons/fa";
import { FaEye, FaEyeSlash, FaXmark } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { isStrongPassword } from "validator";
import { ImCross } from "react-icons/im";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { REFRESH_TOKEN_NAME, toDashboard } from "../../utils/constant";

export default function LandingPage({ docTitle }: { docTitle: string }) {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const authSignIn = useSignIn();
  const signOut = useSignOut();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNav, setOpenNav] = useState(false);
  const [charactersPerIncrement, setCharactersPerIncrement] = useState(75);
  const [textareaHeight, setTextareaHeight] = useState("56px");
  const [borderRadius, setBorderRadius] = useState("99px");
  const [inputTypePassword, setInputTypePassword] = useState<boolean>(true);
  const { register, watch } = useForm<{
    search: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
  }>({
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

  function handleOpenSignIn() {
    setOpenSignIn((cur) => !cur);
  }

  async function onSignIn() {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/token`,
        {
          username: watch("username"),
          password: watch("password"),
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const decoded = jwtDecode<{ id: number; exp: number }>(
        response.data.access_token
      );
      const signInSuccess = authSignIn({
        auth: {
          token: response.data.access_token,
          type: "Bearer",
        },
        userState: {
          id: decoded.id,
          token: response.data.access_token,
        },
      });
      if (signInSuccess) {
        localStorage.setItem(REFRESH_TOKEN_NAME, response.data.refresh_token);
        setTimeout(() => (window.location.href = toDashboard), 200);
      } else {
        handleOpenSignIn();
        Swal.fire({
          icon: "warning",
          title: "Incorrect",
          text: "Username or Password is incorrect",
          allowOutsideClick: false,
        }).then(() => {
          handleOpenSignIn();
        });
      }
    } catch (error) {
      handleOpenSignIn();
      Swal.fire({
        icon: "warning",
        title: "Incorrect",
        text: "Username or Password is incorrect",
        allowOutsideClick: false,
      }).then(() => {
        handleOpenSignIn();
      });
    }
    setLoading(false);
  }

  return (
    <>
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
                    href={toDashboard}
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
                      Dashboard
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
                <Typography
                  onClick={handleOpenSignIn}
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
                    Sign In
                  </Button>
                </Typography>
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
                  href={toDashboard}
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
                    Dashboard
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
                <Typography
                  className="w-full"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}
                  onClick={handleOpenSignIn}
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
                    Sign In
                  </Button>
                </Typography>
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

      {/* dialog popup modal sign in */}
      <Dialog
        size="md"
        open={openSignIn}
        handler={handleOpenSignIn}
        className="bg-transparent shadow-none"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Card
          className="mx-auto w-full max-w-[24rem]"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="text-center">
              <Typography
                variant="h2"
                className="mb-4 font-bold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Sign In
              </Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="text-lg font-normal"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Enter your Username and Password to Sign In.
              </Typography>
            </div>

            <form className="flex flex-col max-w-screen-lg gap-4 mx-auto mt-8 mb-2">
              <div className="flex flex-col gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Username
                </Typography>
                <Input
                  {...register("username")}
                  size="lg"
                  error={!watch("username") ? true : false}
                  success={watch("username") ? true : false}
                  labelProps={{
                    className: "before:content-none",
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  icon={
                    watch("username") ? (
                      <FaRegCheckCircle size={20} color="green" />
                    ) : (
                      <ImCross size={16} color="red" />
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Password
                </Typography>
                <div>
                  <div className="relative flex items-center w-full">
                    <Input
                      {...register("password")}
                      size="lg"
                      error={!isStrongPassword(watch("password") ?? "")}
                      success={isStrongPassword(watch("password") ?? "")}
                      type={inputTypePassword ? "password" : "text"}
                      labelProps={{
                        className: "before:content-none",
                      }}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      icon={
                        isStrongPassword(watch("password") ?? "") ? (
                          <FaRegCheckCircle size={20} color="green" />
                        ) : (
                          <ImCross size={16} color="red" />
                        )
                      }
                    />
                    <div className="!absolute right-10 cursor-pointer">
                      {inputTypePassword && (
                        <FaEye
                          size={20}
                          color="gray"
                          onClick={() => setInputTypePassword(false)}
                        />
                      )}
                      {!inputTypePassword && (
                        <FaEyeSlash
                          size={22}
                          color="gray"
                          onClick={() => setInputTypePassword(true)}
                        />
                      )}
                    </div>
                  </div>
                  {!isStrongPassword(watch("password") ?? "") && (
                    <Typography
                      variant="small"
                      color="red"
                      className="flex items-center gap-1 mt-2 font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <FaInfoCircle size={14} />
                      Password Invalid
                    </Typography>
                  )}
                </div>
              </div>

              <Button
                className="mt-6"
                fullWidth
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={() => onSignIn()}
                loading={loading}
                disabled={
                  !watch("username") ||
                  !isStrongPassword(watch("password") ?? "")
                }
              >
                Sign In Now
              </Button>
            </form>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
