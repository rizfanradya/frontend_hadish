/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

export default function UserDashboard({ docTitle }: { docTitle: string }) {
  const [charactersPerIncrement, setCharactersPerIncrement] = useState(75);
  const [textareaHeight, setTextareaHeight] = useState("56px");
  const [borderRadius, setBorderRadius] = useState("99px");
  const { register, watch } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });

  useEffect(() => {
    (async () => {
      document.title = docTitle;
      updateCharactersPerIncrement();
      window.addEventListener("resize", updateCharactersPerIncrement);
      return () => {
        window.removeEventListener("resize", updateCharactersPerIncrement);
      };
    })();
  }, []);

  useEffect(() => {
    const searchValue = watch("search");
    const numberOfRows = Math.floor(
      searchValue.length / charactersPerIncrement
    );
    const newHeight = 56 + numberOfRows * 20;
    if (searchValue.length > 0) {
      setTextareaHeight(`${newHeight}px`);
      setBorderRadius("0px");
    } else {
      setTextareaHeight(`56px`);
      setBorderRadius("99px");
    }
  }, [watch("search")]);

  const updateCharactersPerIncrement = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setCharactersPerIncrement(30);
    } else if (width >= 640 && width < 1024) {
      setCharactersPerIncrement(70);
    } else {
      setCharactersPerIncrement(75);
    }
  };

  return (
    <div className="bg-[#202124] text-white h-screen flex flex-col gap-8 items-center justify-center px-6">
      <h1 className="text-6xl font-medium">Hadish</h1>
      {watch("search").length}

      <div
        className={`flex w-full max-w-2xl flex-row items-center gap-2 rounded-[${borderRadius}] border py-2 px-4 transition-all duration-300`}
        style={{ height: textareaHeight }}
      >
        <Textarea
          {...register("search")}
          resize={false}
          placeholder="Search Hadish..."
          className={`!border-0 focus:border-transparent overflow-hidden text-white transition-all duration-300`}
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
    </div>
  );
}
