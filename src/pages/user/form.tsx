/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { DECODE_TOKEN } from "../../utils/constant";
import { isEmail, isStrongPassword } from "validator";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type dataType = {
  id: number;
  created_by: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  status_name: string;
  role: string;
};

export default function FormUser({
  data,
  mode,
  getData,
  setGetData,
  roleData,
}: {
  data?: dataType;
  mode: string;
  getData: boolean;
  setGetData: Dispatch<SetStateAction<boolean>>;
  roleData: any[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, watch, reset } = useForm<dataType>({ defaultValues: data });
  const [inputTypePassword, setInputTypePassword] = useState(true);
  const [refreshUsernameStatus, setRefreshUsernameStatus] =
    useState<boolean>(false);
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");

  useEffect(() => {
    async function checkUsername() {
      setUsernameStatus("checking");
      try {
        await axiosInstance.get(`/user/username/${watch("username")}`);
        setUsernameStatus("taken");
      } catch (error) {
        setUsernameStatus("available");
      }
    }
    if (mode === "add") {
      const username = watch("username");
      if (!username) {
        setUsernameStatus("idle");
        return;
      }
      const timeoutId = setTimeout(() => {
        checkUsername();
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setUsernameStatus("available");
    }
  }, [watch("username"), refreshUsernameStatus]);

  async function onSubmit() {
    try {
      setLoading(true);
      if (mode === "add") {
        await axiosInstance.post(`/user/`, {
          created_by: DECODE_TOKEN?.id,
          username: watch("username"),
          email: watch("email"),
          first_name: watch("first_name"),
          last_name: watch("last_name"),
          password: watch("password"),
          confirm_password: watch("confirm_password"),
          role: watch("role"),
        });
      } else {
        await axiosInstance.put(`/user/${data?.id}`, {
          email: watch("email"),
          first_name: watch("first_name"),
          last_name: watch("last_name"),
          password: watch("password"),
          confirm_password: watch("confirm_password"),
          status: watch("status_name") === "ACTIVE" ? true : false,
          role: watch("role"),
        });
      }
      handleRefreshData();
      handleOpen();
      setRefreshUsernameStatus(!refreshUsernameStatus);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error 404",
        allowOutsideClick: false,
      });
    }
    setLoading(false);
  }

  function handleOpen() {
    setOpen(!open);
    reset();
  }
  function handleRefreshData() {
    setGetData(!getData);
  }
  function handleInputTypePassword() {
    setInputTypePassword(!inputTypePassword);
  }

  return (
    <>
      {mode === "add" ? (
        <Button
          onClick={handleOpen}
          variant="gradient"
          color="green"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add New
        </Button>
      ) : (
        <FaEdit
          size={25}
          onClick={handleOpen}
          className="cursor-pointer"
          color="blue"
        />
      )}

      <Dialog
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {mode === "add" ? "Add New" : "Edit"} user
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex flex-col gap-4 h-[calc(100vh-18rem)] overflow-y-scroll"
        >
          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Username
            </Typography>
            <div>
              <Input
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                error={usernameStatus === "taken"}
                {...register("username")}
                disabled={mode !== "add"}
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

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Email
            </Typography>
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              error={!isEmail(watch("email") ?? "")}
              {...register("email")}
            />
          </div>

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              First Name
            </Typography>
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              error={!watch("first_name")}
              {...register("first_name")}
            />
          </div>

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Last Name
            </Typography>
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              error={!watch("last_name")}
              {...register("last_name")}
            />
          </div>

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Password
            </Typography>
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              type={inputTypePassword ? "password" : "text"}
              error={!isStrongPassword(watch("password") ?? "")}
              {...register("password")}
              icon={
                inputTypePassword ? (
                  <FaEye
                    size={20}
                    className="cursor-pointer"
                    onClick={handleInputTypePassword}
                  />
                ) : (
                  <FaEyeSlash
                    size={20}
                    className="cursor-pointer"
                    onClick={handleInputTypePassword}
                  />
                )
              }
            />
          </div>

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Confirm Password
            </Typography>
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              type={inputTypePassword ? "password" : "text"}
              error={watch("confirm_password") !== watch("password")}
              {...register("confirm_password")}
              icon={
                inputTypePassword ? (
                  <FaEye
                    size={20}
                    className="cursor-pointer"
                    onClick={handleInputTypePassword}
                  />
                ) : (
                  <FaEyeSlash
                    size={20}
                    className="cursor-pointer"
                    onClick={handleInputTypePassword}
                  />
                )
              }
            />
          </div>

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Status
            </Typography>
            <select
              {...register("status_name")}
              className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Role
            </Typography>
            <select
              {...register("role")}
              className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {mode === "add" && <option>-</option>}
              {roleData.map((doc) => (
                <option value={doc.id} key={doc.id}>
                  {doc.role}
                </option>
              ))}
            </select>
          </div>
        </DialogBody>

        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            loading={loading}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={onSubmit}
            loading={loading}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            disabled={
              !watch("username") ||
              !isEmail(watch("email") ?? "") ||
              !watch("first_name") ||
              !watch("last_name") ||
              !isStrongPassword(watch("password") ?? "") ||
              watch("confirm_password") !== watch("password") ||
              usernameStatus !== "available"
            }
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
