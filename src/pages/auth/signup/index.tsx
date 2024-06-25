/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toSignIn, toUserDashboard } from "../../../utils/constant";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import { FaInfoCircle, FaRegCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { isEmail, isStrongPassword } from "validator";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function SignUp({ docTitle }: { docTitle: string }) {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputTypePassword, setInputTypePassword] = useState<boolean>(true);
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] =
    useState<boolean>(true);
  const [refreshUsernameStatus, setRefreshUsernameStatus] =
    useState<boolean>(false);
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");
  const { register, watch } = useForm<{
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
  }>();

  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  useEffect(() => {
    const username = watch("username");
    if (!username) {
      setUsernameStatus("idle");
      return;
    }
    async function checkUsername() {
      setUsernameStatus("checking");
      try {
        await axiosInstance.get(`/user/username/${watch("username")}`);
        setUsernameStatus("taken");
      } catch (error) {
        setUsernameStatus("available");
      }
    }
    const timeoutId = setTimeout(() => {
      checkUsername();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [watch("username"), refreshUsernameStatus]);

  async function onSubmit() {
    if (usernameStatus === "taken") {
      Swal.fire({
        icon: "error",
        title: "Username Taken",
        text: "The username is already taken. Please choose another one.",
      });
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.post(`/user`, {
        created_by: 0,
        updated_by: 0,
        username: watch("username"),
        first_name: watch("first_name"),
        last_name: watch("last_name"),
        email: watch("email"),
        password: watch("password"),
        confirm_password: watch("confirm_password"),
      });
      window.location.href = toSignIn;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Username Taken",
        text: "The username is already taken. Please choose another one.",
        allowOutsideClick: false,
      });
    }
    setLoading(false);
    setRefreshUsernameStatus(!refreshUsernameStatus);
  }

  if (authHeader && authUser) {
    window.location.href = toUserDashboard;
  } else
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl m-auto my-20">
        <div className="text-center">
          <Typography
            variant="h2"
            className="mb-4 font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Enter your information to register.
          </Typography>
        </div>

        <form className="flex flex-col max-w-screen-lg gap-4 mx-auto mt-8 mb-2 w-80 lg:w-1/2">
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
            <div>
              <Input
                {...register("username")}
                size="lg"
                icon={
                  usernameStatus === "available" ? (
                    <FaRegCheckCircle size={20} color="green" />
                  ) : (
                    usernameStatus === "taken" && (
                      <ImCross size={16} color="red" />
                    )
                  )
                }
                error={usernameStatus === "taken"}
                success={usernameStatus === "available"}
                labelProps={{
                  className: "before:content-none",
                }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              {usernameStatus === "taken" && (
                <Typography
                  variant="small"
                  color="red"
                  className="flex items-center gap-1 mt-2 font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <FaInfoCircle size={14} />
                  User Already Exist.
                </Typography>
              )}
            </div>
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
              Email
            </Typography>
            <Input
              {...register("email")}
              size="lg"
              type="email"
              error={!isEmail(watch("email") ?? "")}
              success={isEmail(watch("email") ?? "")}
              labelProps={{
                className: "before:content-none",
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              icon={
                isEmail(watch("email") ?? "") ? (
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
              First Name
            </Typography>
            <Input
              {...register("first_name")}
              size="lg"
              labelProps={{
                className: "before:content-none",
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              error={!watch("first_name") ? true : false}
              success={watch("first_name") ? true : false}
              icon={
                watch("first_name") ? (
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
              Last Name
            </Typography>
            <Input
              {...register("last_name")}
              size="lg"
              labelProps={{
                className: "before:content-none",
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              error={!watch("last_name") ? true : false}
              success={watch("last_name") ? true : false}
              icon={
                watch("last_name") ? (
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
                  Use at least 8 characters, one uppercase, one lowercase and
                  one number.
                </Typography>
              )}
            </div>
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
              Confirm Password
            </Typography>
            <div>
              <div className="relative flex items-center w-full">
                <Input
                  {...register("confirm_password")}
                  size="lg"
                  type={inputTypeConfirmPassword ? "password" : "text"}
                  error={watch("password") !== watch("confirm_password")}
                  success={watch("password") === watch("confirm_password")}
                  labelProps={{
                    className: "before:content-none",
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  icon={
                    watch("password") === watch("confirm_password") ? (
                      <FaRegCheckCircle size={20} color="green" />
                    ) : (
                      watch("password") !== watch("confirm_password") && (
                        <ImCross size={16} color="red" />
                      )
                    )
                  }
                />

                <div className="!absolute right-10 cursor-pointer">
                  {inputTypeConfirmPassword && (
                    <FaEye
                      size={20}
                      color="gray"
                      onClick={() => setInputTypeConfirmPassword(false)}
                    />
                  )}
                  {!inputTypeConfirmPassword && (
                    <FaEyeSlash
                      size={22}
                      color="gray"
                      onClick={() => setInputTypeConfirmPassword(true)}
                    />
                  )}
                </div>
              </div>
              {watch("password") !== watch("confirm_password") && (
                <Typography
                  variant="small"
                  color="red"
                  className="flex items-center gap-1 mt-2 font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <FaInfoCircle size={14} />
                  Password Not Match.
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
            onClick={() => onSubmit()}
            loading={loading}
            disabled={
              usernameStatus !== "available" ||
              !isEmail(watch("email") ?? "") ||
              (!watch("first_name") ? true : false) ||
              (!watch("last_name") ? true : false) ||
              !isStrongPassword(watch("password") ?? "") ||
              watch("password") !== watch("confirm_password")
            }
          >
            Register Now
          </Button>

          <Typography
            variant="paragraph"
            className="mt-4 font-medium text-center text-blue-gray-500"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Already have an account?
            <Link to={toSignIn} className="ml-1 text-gray-900">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    );
}
