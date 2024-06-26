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
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { DECODE_TOKEN } from "../../../utils/constant";

type dataType = {
  id: number;
  created_by: number;
  updated_by: number;
  hadith: number;
  type_hadith: number;
  explanation: number;
};

export default function FormHadith({
  data,
  mode,
  getData,
  setGetData,
  typeHadithData,
}: {
  data?: dataType;
  mode: string;
  getData: boolean;
  setGetData: Dispatch<SetStateAction<boolean>>;
  typeHadithData: any[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, watch, reset } = useForm<dataType>({ defaultValues: data });

  async function onSubmit() {
    try {
      setLoading(true);
      if (mode === "add") {
        await axiosInstance.post(`/hadith/`, {
          created_by: DECODE_TOKEN?.id,
          updated_by: DECODE_TOKEN?.id,
          type_hadith: watch("type_hadith"),
          hadith: watch("hadith"),
          explanation: watch("explanation"),
        });
      } else {
        await axiosInstance.put(`/hadith/${data?.id}`, {
          created_by: DECODE_TOKEN?.id,
          updated_by: DECODE_TOKEN?.id,
          type_hadith: watch("type_hadith"),
          hadith: watch("hadith"),
          explanation: watch("explanation"),
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
          {mode === "add" ? "Add New" : "Edit"} hadish
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
              Hadish
            </Typography>
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              error={!watch("hadith")}
              {...register("hadith")}
            />
          </div>

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Type Hadish
            </Typography>
            <select
              {...register("type_hadith")}
              className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {typeHadithData.map((doc) => (
                <option value={doc.id} key={doc.id}>
                  {doc.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Explanation
            </Typography>
            <Textarea
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              resize
              error={!watch("explanation")}
              {...register("explanation")}
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
            disabled={
              !watch("hadith") || !watch("explanation") || !watch("type_hadith")
            }
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
