import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFilter } from "react-icons/fa6";

type dataType = {
  filter_by: string;
  amount: string;
};

export default function HadithFilter({
  setFilter,
  setAmountAppraisers,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
  setAmountAppraisers: Dispatch<SetStateAction<string>>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { register, watch } = useForm<dataType>({
    defaultValues: {
      filter_by: localStorage.getItem("hadith_filter_by") || "all",
      amount: localStorage.getItem("hadith_amount_appraiser") || "",
    },
  });

  function handleOpen() {
    setOpen(!open);
    setFilter(watch("filter_by"));
    setAmountAppraisers(watch("amount"));
    localStorage.setItem("hadith_filter_by", watch("filter_by"));
    localStorage.setItem("hadith_amount_appraiser", watch("amount"));
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        color="blue"
        size="sm"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <FaFilter size={20} />
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
          Filter hadish
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
              Filter By
            </Typography>
            <select
              {...register("filter_by")}
              className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">ALL</option>
              <option value="number_of_appraisers">Number of Appraisers</option>
            </select>
          </div>

          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Number
            </Typography>
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              error={!watch("amount")}
              {...register("amount")}
              type="number"
              disabled={watch("filter_by") !== "number_of_appraisers"}
            />
          </div>
        </DialogBody>

        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="gradient"
            color="green"
            onClick={handleOpen}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            disabled={
              watch("filter_by") === "number_of_appraisers" && !watch("amount")
            }
          >
            filter
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
