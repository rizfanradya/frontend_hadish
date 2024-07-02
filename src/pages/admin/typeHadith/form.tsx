/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from "react";
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
import { FaEdit } from "react-icons/fa";
import { DECODE_TOKEN } from "../../../utils/constant";

type dataType = {
  id: number;
  created_by: number;
  updated_by: number;
  type: string;
};

export default function FormTypeHadith({
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

  async function onSubmit() {
    try {
      setLoading(true);
      if (mode === "add") {
        await axiosInstance.post(`/type_hadith/`, {
          created_by: DECODE_TOKEN?.id,
          updated_by: DECODE_TOKEN?.id,
          type: watch("type"),
        });
      } else {
        await axiosInstance.put(`/type_hadith/${data?.id}`, {
          created_by: data?.created_by,
          updated_by: DECODE_TOKEN?.id,
          type: watch("type"),
        });
      }
      handleRefreshData();
      handleOpen();
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
          {mode === "add" ? "Add New" : "Edit"} type hadish
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
              Type
            </Typography>
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              error={!watch("type")}
              {...register("type")}
            />
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
            disabled={!watch("type")}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
