/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

export default function UserDashboard({ docTitle }: { docTitle: string }) {
  const [textareaHeight, setTextareaHeight] = useState("56px");
  const { register, watch } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });

  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  useEffect(() => {
    const searchValue = watch("search");
    const numberOfRows = Math.ceil(searchValue.length / 80);
    const newHeight = Math.min(numberOfRows) * 20 + 56;
    setTextareaHeight(`${newHeight}px`);
  }, [watch("search")]);

  return (
    <div className="bg-[#202124] text-white h-screen flex flex-col gap-8 items-center justify-center">
      <h1 className="text-6xl font-medium">Hadish</h1>
      {/* {watch("search").length} */}

      <div
        className={`flex w-full max-w-2xl flex-row items-center gap-2 rounded-[99px] border py-2 px-4`}
        style={{ maxHeight: textareaHeight }}
      >
        <Textarea
          {...register("search")}
          resize={false}
          placeholder="Search Hadish..."
          className="h-full !border-0 focus:border-transparent overflow-hidden text-white"
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

      {/* {textareaHeight} */}
    </div>
  );
}
