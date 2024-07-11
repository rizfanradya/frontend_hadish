/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import {
  DECODE_TOKEN,
  roleExpert,
  roleSuperAdministrator,
  toExpertTableListHadith,
  toLandingPage,
} from "../../utils/constant";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/loading";
import { useForm } from "react-hook-form";
import { Card } from "@material-tailwind/react";

export default function ListHadith({ docTitle }: { docTitle: string }) {
  const [userInfo, setUserInfo] = useState({ role_name: "" });
  const [hitApi, setHitApi] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
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
      document.title = docTitle;
    })();
  }, []);

  if (initialLoading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (
    userInfo.role_name !== roleExpert &&
    userInfo.role_name !== roleSuperAdministrator
  ) {
    window.location.href = toLandingPage;
  } else {
    return (
      <Layout isActive={toExpertTableListHadith} title="List Hadish">
        <Card
          className="w-full h-full p-4 overflow-scroll"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <></>
        </Card>
      </Layout>
    );
  }
}
