/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { toAdminTableUser } from "../../../utils/constant";
import { Card, Chip, Input } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import LoadingSpinner from "../../../components/loading";
import { FaTrash } from "react-icons/fa6";
import { DeleteData } from "../../../components/deleteData";
import axiosInstance from "../../../utils/axiosInstance";
import Swal from "sweetalert2";
import FormUser from "./form";
import { useForm } from "react-hook-form";

export default function AdminTableUser({ docTitle }: { docTitle: string }) {
  const [hitApi, setHitApi] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState([]);
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
      document.title = docTitle;
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `/role/?limit=999999&offset=0`
        );
        setRole(data.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Server Error 404",
          allowOutsideClick: false,
        });
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/user/?limit=${data.limit}&offset=${data.offset}&search=${watch(
            "search"
          )}`
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
  }, [watch("search"), hitApi, data.limit, data.offset]);

  return (
    <Layout isActive={toAdminTableUser} title="User Table">
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
              <FormUser
                mode="add"
                setGetData={setHitApi}
                getData={hitApi}
                roleData={role}
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
              name: "Username",
              selector: (row) => row.username,
              sortable: true,
              wrap: true,
              width: "150px",
            },
            {
              name: "Email",
              selector: (row: any) => row.email,
              sortable: true,
              wrap: true,
              width: "220px",
            },
            {
              name: "First Name",
              selector: (row: any) => row.first_name,
              sortable: true,
              wrap: true,
              width: "150px",
            },
            {
              name: "Last Name",
              selector: (row: any) => row.last_name,
              sortable: true,
              wrap: true,
              width: "150px",
            },
            {
              name: "Role",
              selector: (row: any) => row.role_name,
              sortable: true,
              wrap: true,
            },
            {
              name: "Status",
              sortable: true,
              wrap: true,
              cell: (row: any) => (
                <Chip
                  variant="gradient"
                  color={row.status ? "green" : "red"}
                  value={row.status_name}
                  className="py-0.5 px-2 text-[11px] font-medium w-fit"
                />
              ),
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
                  <FormUser
                    data={row}
                    mode="edit"
                    setGetData={setHitApi}
                    getData={hitApi}
                    roleData={role}
                  />
                  <div
                    className="text-red-500 cursor-pointer"
                    onClick={async () =>
                      await DeleteData(`/user/${row.id}`, setHitApi, hitApi)
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
