/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import { DECODE_TOKEN } from "../../../utils/constant";
import { Button } from "@material-tailwind/react";

type dataType = {
  id: number;
  hadith: number;
  type_hadith: number;
  explanation: number;
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
  const [loading, setLoading] = useState<boolean>(false);
  const { register, watch } = useForm<dataType>({ defaultValues: data });

  // useEffect(() => {
  //   const timeoutId = setTimeout(async () => {
  //     if (watch("type_hadith") !== data?.type_hadith) {
  //       try {
  //         setLoading(true);
  //         await axiosInstance.put(`/hadith/${data?.id}`, {
  //           created_by: data?.created_by,
  //           updated_by: DECODE_TOKEN?.id,
  //           type_hadith: watch("type_hadith"),
  //           hadith: data?.hadith,
  //           explanation: data?.explanation,
  //         });
  //         handleRefreshData();
  //       } catch (error) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Server Error 404",
  //           allowOutsideClick: false,
  //         });
  //       }
  //       setLoading(false);
  //     }
  //   }, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [watch("type_hadith")]);

  function handleRefreshData() {
    setGetData(!getData);
  }

  return (
    <>
      {loading ? (
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="bg-gray-200"
          loading={loading}
          disabled
        >
          {" "}
        </Button>
      ) : (
        <select
          {...register("type_hadith")}
          className="border cursor-pointer w-min border-gray-300 text-xs text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {typeHadithData.map((doc) => (
            <option value={doc.id} key={doc.id} className="text-sm">
              {doc.type}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
