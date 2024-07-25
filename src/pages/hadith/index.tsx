/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import { Card, Input } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import LoadingSpinner from "../../components/loading";
import { DeleteData } from "../../components/deleteData";
import { FaTrash } from "react-icons/fa6";
import {
  DECODE_TOKEN,
  roleAdmin,
  roleSuperAdministrator,
  toAdminTableHadith,
  toLandingPage,
} from "../../utils/constant";
import FormHadith from "./form";
import UploadHadith from "./upload";
import HadithAssesed from "./assesed";
import DownloadTemplate from "./downloadTemplate";
import DownloadHadith from "./downloadHadith";

export default function AdminTableHadith({ docTitle }: { docTitle: string }) {
  const [userInfo, setUserInfo] = useState({ role_name: "" });
  const [hitApi, setHitApi] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [dataTypeHadith, setDataTypeHadith] = useState<any[]>([]);
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
        const { data } = await axiosInstance.get(`/user/${DECODE_TOKEN?.id}`);
        const typeHadithData = await axiosInstance.get(
          `/type_hadith/?limit=999999&offset=0`
        );
        setDataTypeHadith(typeHadithData.data.data);
        setUserInfo(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Server Error 404",
          allowOutsideClick: false,
        });
      } finally {
        setInitialLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    document.title = docTitle;
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/hadith/?limit=${data.limit}&offset=${data.offset}&search=${watch(
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

  if (initialLoading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (
    userInfo.role_name !== roleAdmin &&
    userInfo.role_name !== roleSuperAdministrator
  ) {
    window.location.href = toLandingPage;
  } else {
    return (
      <Layout isActive={toAdminTableHadith} title="Hadish Table">
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
                <div className="flex gap-2">
                  <FormHadith
                    mode="add"
                    setGetData={setHitApi}
                    getData={hitApi}
                    typeHadithData={dataTypeHadith}
                  />
                  <UploadHadith getData={hitApi} setGetData={setHitApi} />
                  <DownloadTemplate />
                  <DownloadHadith />
                </div>
                <div className="flex gap-2">
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
                name: "Hadish Arab",
                selector: (row) => row.hadith_arab,
                sortable: true,
                width: "250px",
              },
              {
                name: "Hadish Melayu",
                selector: (row) => row.hadith_melayu,
                sortable: true,
                width: "250px",
              },
              {
                name: "Explanation",
                selector: (row) => row.explanation,
                sortable: true,
                width: "250px",
              },
              {
                name: "Action",
                cell: (row: any) => (
                  <div className="flex items-center justify-center gap-4">
                    <FormHadith
                      data={row}
                      mode="edit"
                      setGetData={setHitApi}
                      getData={hitApi}
                      typeHadithData={dataTypeHadith}
                    />
                    <div
                      className="text-red-500 cursor-pointer"
                      onClick={async () =>
                        await DeleteData(`/hadith/${row.id}`, setHitApi, hitApi)
                      }
                    >
                      <FaTrash size={20} />
                    </div>
                    <HadithAssesed data={row.assesed} />
                  </div>
                ),
                width: "250px",
              },
            ]}
          />
        </Card>
      </Layout>
    );
  }
}
