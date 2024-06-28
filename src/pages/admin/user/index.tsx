/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { toAdminTableUser } from "../../../utils/constant";
import { Card, Chip } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import LoadingSpinner from "../../../components/loading";
import { FaTrash } from "react-icons/fa6";
import { DeleteData } from "../../../components/deleteData";
import axiosInstance from "../../../utils/axiosInstance";
import Swal from "sweetalert2";

export default function AdminTableUser({ docTitle }: { docTitle: string }) {
  const [hitApi, setHitApi] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState({
    total_data: 0,
    data: [],
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/user/?limit=${data.limit}&offset=${data.offset}`
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

  return (
    <Layout isActive={toAdminTableUser} title="User Table">
      <Card
        className="w-full h-full overflow-scroll"
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
              {/* <FormBlockedDay
                mode="add"
                setHitApi={setHitApi}
                hitApi={hitApi}
              />
              <input
                className="rounded input input-bordered input-sm"
                value={filterInputText}
                onChange={(e) => setFilterInputText(e.target.value)}
                placeholder="search..."
              /> */}
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
              selector: (row: any) => row.username,
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
              selector: (row: any) => row.role,
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
                  color={row.status === "ACTIVE" ? "green" : "red"}
                  value={row.status}
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
              name: "Updated at",
              selector: (row: any) => row.updated_at,
              sortable: true,
              wrap: true,
              width: "230px",
            },
            {
              name: "Action",
              cell: (row: any) => (
                <div className="flex items-center justify-center gap-3">
                  {/* <FormBlockedDay
                    data={row}
                    mode="edit"
                    setHitApi={setHitApi}
                    hitApi={hitApi}
                  /> */}
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
