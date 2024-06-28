import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";
import axiosInstance from "../../utils/axiosInstance";

export async function DeleteData(
  path: string,
  setHitApi: Dispatch<SetStateAction<boolean>>,
  hitApi: boolean
) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axiosInstance.delete(path);
      setHitApi(!hitApi);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error 404",
        allowOutsideClick: false,
      });
    }
  }
}
