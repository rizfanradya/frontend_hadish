import { Button } from "@material-tailwind/react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";

export default function DownloadHadith() {
  const [loading, setLoading] = useState<boolean>(false);

  async function download() {
    setLoading(true);
    try {
      await axiosInstance
        .get(`/hadith/download`, { responseType: "blob" })
        .then((response) => {
          const href = URL.createObjectURL(response.data);
          const link = document.createElement("a");
          link.href = href;
          const timestamp = new Date()
            .toLocaleString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .replace(/\//g, "-")
            .replace(/, /g, "_");
          link.setAttribute("download", `data_hadith_${timestamp}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        });
      Swal.fire({
        icon: "success",
        title: "Download Success",
        text: "Hadith data downloaded successfully check your download folder",
        allowOutsideClick: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error 404",
        text: "Failed to download hadith data",
        allowOutsideClick: false,
      });
    }
    setLoading(false);
  }

  return (
    <>
      <Button
        onClick={download}
        variant="gradient"
        color="indigo"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        loading={loading}
      >
        download
      </Button>
    </>
  );
}
