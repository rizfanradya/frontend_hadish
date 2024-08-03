/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  DECODE_TOKEN,
  roleAdmin,
  toAdminSetupModel,
  toLandingPage,
} from "../../utils/constant";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/loading";
import Layout from "../../components/layout";
import { Card, Input } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
import { DeleteData } from "../../components/deleteData";
import UploadModel from "./upload";

export default function SetupModel({ docTitle }: { docTitle: string }) {
  const [userInfo, setUserInfo] = useState({ role_name: "" });
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
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
    document.title = docTitle;
    (async () => {
      try {
        const { data } = await axiosInstance.get(`/user/${DECODE_TOKEN?.id}`);
        setUserInfo(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Server Error 404",
          allowOutsideClick: false,
        });
      } finally {
        setInitialLoading(false);
        setLoading(false);
      }
    })();
  }, []);

  if (initialLoading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (userInfo.role_name !== roleAdmin) {
    window.location.href = toLandingPage;
  } else {
    return (
      <Layout isActive={toAdminSetupModel} title="Model Table">
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
                {/* <FormRole mode="add" setGetData={setHitApi} getData={hitApi} /> */}
                <div className="flex gap-2">
                  <UploadModel getData={hitApi} setGetData={setHitApi} />
                </div>
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
                name: "Model",
                selector: (row) => row.model,
                sortable: true,
                wrap: true,
              },
              {
                name: "Action",
                cell: (row: any) => (
                  <div className="flex items-center justify-center gap-4">
                    {/* <FormRole
                      data={row}
                      mode="edit"
                      setGetData={setHitApi}
                      getData={hitApi}
                    /> */}
                    <div
                      className="text-red-500 cursor-pointer"
                      onClick={async () =>
                        await DeleteData(`/model/${row.id}`, setHitApi, hitApi)
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
}
