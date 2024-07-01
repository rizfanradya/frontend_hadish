/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
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
import { DECODE_TOKEN } from "../../../utils/constant";

type dataType = {
  id: number;
  created_by: number;
  updated_by: number;
  role: string;
};

export default function FormRole({
  data,
  mode,
  getData,
  setGetData,
}: {
  data?: dataType;
  mode: string;
  getData: boolean;
  setGetData: Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, watch, reset } = useForm<dataType>({ defaultValues: data });
  const [refreshRoleStatus, setRefreshRoleStatus] = useState<boolean>(false);
  const [roleStatus, setRoleStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");

  useEffect(() => {
    async function checkRole() {
      setRoleStatus("checking");
      try {
        await axiosInstance.get(`/role/name/${watch("role")}`);
        setRoleStatus("taken");
      } catch (error) {
        setRoleStatus("available");
      }
    }
    if (!watch("role")) {
      setRoleStatus("idle");
      return;
    }
    const timeoutId = setTimeout(() => {
      checkRole();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [watch("role"), refreshRoleStatus]);

  async function onSubmit() {
    try {
      setLoading(true);
      if (mode === "add") {
        await axiosInstance.post(`/role/`, {
          created_by: DECODE_TOKEN?.id,
          updated_by: DECODE_TOKEN?.id,
          role: watch("role"),
        });
      } else {
        await axiosInstance.put(`/role/${data?.id}`, {
          created_by: DECODE_TOKEN?.id,
          updated_by: DECODE_TOKEN?.id,
          role: watch("role"),
        });
      }
      handleRefreshData();
      handleOpen();
      setRefreshRoleStatus(!refreshRoleStatus);
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
          {mode === "add" ? "Add New" : "Edit"} role
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
              Role
            </Typography>
            <div>
              <Input
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                error={roleStatus === "taken"}
                {...register("role")}
              />
              {roleStatus === "taken" && (
                <Typography
                  variant="small"
                  color="red"
                  className="flex items-center gap-1 mt-2 font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <FaInfoCircle size={14} />
                  Role Already Exist.
                </Typography>
              )}
            </div>
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
            disabled={!watch("role") || roleStatus !== "available"}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
