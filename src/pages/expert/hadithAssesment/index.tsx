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
import { toExpertTableHadithAssesment } from "../../../utils/constant";
import FormHadithAssesment from "./form";

export default function ExpertTableHadithAssesment({
  docTitle,
}: {
  docTitle: string;
}) {
  const [hitApi, setHitApi] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [typeHadith, setTypeHadith] = useState([]);
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
        const { data } = await axiosInstance.get(
          `/type_hadith/?limit=999999&offset=0`
        );
        setTypeHadith(data.data);
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

  return (
    <Layout
      isActive={toExpertTableHadithAssesment}
      title="Hadish Assesment Table"
    >
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
              <div></div>
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
              name: "Hadish",
              selector: (row) => row.hadith,
              sortable: true,
              wrap: true,
              width: "250px",
            },
            {
              name: "Type Hadish",
              selector: (row) => row.type_hadith_name,
              sortable: true,
              wrap: true,
              width: "250px",
            },
            {
              name: "Explanation",
              selector: (row) => row.explanation,
              sortable: true,
              wrap: true,
              width: "250px",
            },
            {
              name: "Action",
              cell: (row: any) => (
                <div className="flex items-center justify-center gap-4">
                  <FormHadithAssesment
                    data={row}
                    setGetData={setHitApi}
                    getData={hitApi}
                    typeHadithData={typeHadith}
                  />
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
