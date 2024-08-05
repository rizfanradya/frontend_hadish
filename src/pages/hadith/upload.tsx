/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";

type dataType = {
  upload: FileList;
};

export default function UploadHadith({
  getData,
  setGetData,
}: {
  getData: boolean;
  setGetData: Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, watch, reset } = useForm<dataType>();

  async function onSubmit() {
    setLoading(true);
    try {
      await axiosInstance.post(
        `/hadith/upload`,
        {
          file: watch("upload")[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleOpen();
      Swal.fire({
        icon: "success",
        title: "Hadith uploaded successfully",
        text: "Hadith has been uploaded successfully",
        allowOutsideClick: false,
      }).then(() => {
        handleRefreshData();
      });
    } catch (error: any) {
      handleOpen();
      Swal.fire({
        icon: "error",
        title: "Server Error 404",
        text: error.response.data.detail.message,
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
      <Button
        onClick={handleOpen}
        variant="gradient"
        color="blue"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Upload hadish
      </Button>

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
          Upload hadish
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <input
            type="file"
            accept=".csv"
            {...register("upload")}
            className={`relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3 file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-whit file:dark:text-white ${
              watch("upload") && watch("upload")[0].type !== "text/csv"
                ? "border-red-500"
                : ""
            }`}
          />
          {watch("upload") && watch("upload")[0] && (
            <p className="text-sm text-red-500">
              {watch("upload")[0].type !== "text/csv"
                ? "File must be in .csv format"
                : ""}
            </p>
          )}
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
              !watch("upload") ||
              (watch("upload") && watch("upload")[0].type !== "text/csv")
            }
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
