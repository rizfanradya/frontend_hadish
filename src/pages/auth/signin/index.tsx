/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toSignUp, toUserDashboard } from "../../../utils/constant";
import axiosInstance from "../../../utils/axiosInstance";
import { Button, Input, Typography } from "@material-tailwind/react";
import { isEmail, isStrongPassword } from "validator";
import { FaInfoCircle, FaRegCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function SignIn({ docTitle }: { docTitle: string }) {
  const authSignIn = useSignIn();
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputTypePassword, setInputTypePassword] = useState<boolean>(true);
  const { register, watch } = useForm<{
    email: string;
    password: string;
  }>();

  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  async function onSubmit() {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/token`,
        {
          username: watch("email"),
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
        window.location.href = toUserDashboard;
      } else {
        Swal.fire({
          icon: "warning",
          title: "Incorrect",
          text: "Email or Password is incorrect",
          allowOutsideClick: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Incorrect",
        text: "Email or Password is incorrect",
        allowOutsideClick: false,
      });
    }
    setLoading(false);
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
            Enter your Email and Password to Sign In.
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
              Email
            </Typography>
            <div>
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
              {!isEmail(watch("email") ?? "") && (
                <Typography
                  variant="small"
                  color="red"
                  className="flex items-center gap-1 mt-2 font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <FaInfoCircle size={14} />
                  Email Invalid
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
            onClick={() => onSubmit()}
            loading={loading}
            disabled={
              !isEmail(watch("email") ?? "") ||
              !isStrongPassword(watch("password") ?? "")
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
            don't have an account?
            <Link to={toSignUp} className="ml-1 text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </div>
    );
}
