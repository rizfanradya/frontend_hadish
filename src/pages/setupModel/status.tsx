import { Button } from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";

export default function Status({
  doc,
  getData,
  setGetData,
}: {
  doc: { id: number; status: string; name: string };
  getData: boolean;
  setGetData: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit() {
    setLoading(true);
    try {
      if (doc.status) {
        await axiosInstance.put(
          `/model/${doc.id}?name=${doc.name}&status=false`
        );
      } else {
        await axiosInstance.put(
          `/model/${doc.id}?name=${doc.name}&status=true`
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error 404",
        text: "Cannot Change Status",
        allowOutsideClick: false,
      });
    }
    setGetData(!getData);
    setLoading(false);
  }

  return (
    <Button
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      size="sm"
      onClick={() => onSubmit()}
      variant="gradient"
      color={doc.status ? "green" : "red"}
      className="w-28"
      loading={loading}
    >
      {doc.status ? "Active" : "Inactive"}
    </Button>
  );
}
