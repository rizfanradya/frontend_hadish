import { Button } from "@material-tailwind/react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";

export default function DownloadTemplate() {
  const [loading, setLoading] = useState<boolean>(false);

  async function download() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/hadith/template`, {
        responseType: "blob",
      });
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "hadith_template.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
      Swal.fire({
        icon: "success",
        title: "Download Success",
        text: "Template downloaded successfully check your download folder",
        allowOutsideClick: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error 404",
        text: "Failed to download template",
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
        color="yellow"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        loading={loading}
      >
        template
      </Button>
    </>
  );
}
