/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../../components/layout";
import axiosInstance from "../../../utils/axiosInstance";
import Swal from "sweetalert2";
import { Card, Input } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import LoadingSpinner from "../../../components/loading";
import { DeleteData } from "../../../components/deleteData";
import { FaTrash } from "react-icons/fa6";
import { toAdminTableTypeHadith } from "../../../utils/constant";
import FormTypeHadith from "./form";

export default function AdminTableTypeHadith({
  docTitle,
}: {
  docTitle: string;
}) {
  const [hitApi, setHitApi] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { register, watch } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });
  const [data, setData] = useState({
    total_data: 0,
    data: [],
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/type_hadith/?limit=${data.limit}&offset=${data.offset}`
        );
        setData(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Server Error 404",
          allowOutsideClick: false,
        });
      }
      setLoading(false);
    })();
    document.title = docTitle;
  }, [hitApi, data.limit, data.offset]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/type_hadith/?limit=${data.limit}&offset=${
            data.offset
          }&search=${watch("search")}`
        );
        setData(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Server Error 404",
          allowOutsideClick: false,
        });
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [watch("search")]);

  return (
    <Layout isActive={toAdminTableTypeHadith} title="Type Hadish Table">
      <Card
        className="w-full h-full p-4 overflow-scroll"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DataTable
          data={data.data}
          highlightOnHover={true}
          progressPending={loading}
          progressComponent={<LoadingSpinner fullScreen={false} />}
          pagination
          paginationServer={true}
          paginationTotalRows={data.total_data}
          paginationDefaultPage={1}
          onChangeRowsPerPage={(e) =>
            setData((prevUserData: any) => ({
              ...prevUserData,
              limit: e,
            }))
          }
          onChangePage={(e) =>
            setData((prevUserData: any) => ({
              ...prevUserData,
              offset: (e - 1) * data.limit,
            }))
          }
          subHeader
          subHeaderComponent={
            <div className="flex items-center justify-between w-full text-start">
              <FormTypeHadith
                mode="add"
                setGetData={setHitApi}
                getData={hitApi}
              />
              <div>
                <Input
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  value={watch("search")}
                  {...register("search")}
                  label="Search..."
                />
              </div>
            </div>
          }
          columns={[
            {
              name: "No",
              selector: (_, index) => index! + 1,
              width: "50px",
              wrap: true,
            },
            {
              name: "Type",
              selector: (row) => row.type,
              sortable: true,
              wrap: true,
              width: "250px",
            },
            {
              name: "Created At",
              selector: (row: any) => row.created_at,
              sortable: true,
              wrap: true,
              width: "230px",
            },

            {
              name: "Updated At",
              selector: (row: any) => row.updated_at,
              sortable: true,
              wrap: true,
              width: "230px",
            },
            {
              name: "Created By",
              selector: (row: any) =>
                row.created_by ? row.created_by.username : "",
              sortable: true,
              wrap: true,
              width: "230px",
            },
            {
              name: "Updated By",
              selector: (row: any) =>
                row.updated_by ? row.updated_by.username : "",
              sortable: true,
              wrap: true,
              width: "230px",
            },
            {
              name: "Action",
              cell: (row: any) => (
                <div className="flex items-center justify-center gap-4">
                  <FormTypeHadith
                    data={row}
                    mode="edit"
                    setGetData={setHitApi}
                    getData={hitApi}
                  />
                  <div
                    className="text-red-500 cursor-pointer"
                    onClick={async () =>
                      await DeleteData(
                        `/type_hadith/${row.id}`,
                        setHitApi,
                        hitApi
                      )
                    }
                  >
                    <FaTrash size={20} />
                  </div>
                </div>
              ),
              width: "150px",
            },
          ]}
        />
      </Card>
    </Layout>
  );
}
