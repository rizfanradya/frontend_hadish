/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

type dataType = {
  id: number;
  hadith_id: number;
  evaluation: number;
  hadith_arab: string;
  hadith_melayu: string;
  explanation: string;
  type_hadith: number;
};

export default function FormHadithAssesment({
  data,
  getData,
  setGetData,
  typeHadithData,
}: {
  data?: dataType;
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
      await axiosInstance.post(`/hadith_assesment`, {
        hadith_id: data?.id,
        evaluation_id: watch("type_hadith"),
      });
      handleRefreshData();
      handleOpen();
    } catch (error) {
      handleOpen();
      Swal.fire({
        icon: "error",
        title: "Server Error 404",
        allowOutsideClick: false,
      });
    }
    setLoading(false);
  }

  function handleRefreshData() {
    setGetData(!getData);
  }
  function handleOpen() {
    setOpen(!open);
    reset();
  }

  return (
    <>
      <Button
        variant="gradient"
        size="sm"
        color="blue"
        onClick={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Evaluate
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        size="xl"
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Hadish Assesment
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex flex-col gap-4 h-[calc(100vh-18rem)] overflow-y-scroll"
        >
          <Card
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="blue-gray"
            className="mt-6"
          >
            <CardHeader
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="gradient"
              color="green"
              className="p-2 w-max"
            >
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="text-xs font-semibold uppercase"
              >
                Hadish Arab
              </Typography>
            </CardHeader>

            <CardBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                dir="rtl"
              >
                {data?.hadith_arab}
              </Typography>
            </CardBody>
          </Card>

          <Card
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="blue-gray"
            className="mt-6"
          >
            <CardHeader
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="gradient"
              color="green"
              className="p-2 w-max"
            >
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="text-xs font-semibold uppercase"
              >
                Hadish Melayu
              </Typography>
            </CardHeader>

            <CardBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {data?.hadith_melayu}
              </Typography>
            </CardBody>
          </Card>

          <Card
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="blue-gray"
            className="mt-6"
          >
            <CardHeader
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="gradient"
              color="green"
              className="p-2 w-max"
            >
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="text-xs font-semibold uppercase"
              >
                Explanation
              </Typography>
            </CardHeader>

            <CardBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {data?.explanation}
              </Typography>
            </CardBody>
          </Card>

          <Card
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="blue-gray"
            className="mt-6"
          >
            <CardHeader
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="gradient"
              color="green"
              className="p-2 w-max"
            >
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="text-xs font-semibold uppercase"
              >
                Evaluation
              </Typography>
            </CardHeader>

            <CardBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <select
                {...register("type_hadith")}
                className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""}>-</option>
                {typeHadithData.map((doc) => (
                  <option value={doc.id} key={doc.id}>
                    {doc.type}
                  </option>
                ))}
              </select>
            </CardBody>
          </Card>
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
            disabled={!watch("type_hadith")}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
