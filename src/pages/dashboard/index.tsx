/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Layout, { linkItems } from "../../components/layout";
import { DECODE_TOKEN, toDashboard } from "../../utils/constant";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";

export default function ManageDashboard({ docTitle }: { docTitle: string }) {
  const [userInfo, setUserInfo] = useState({ username: "", role_name: "" });

  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

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
      }
    })();
  }, []);

  const filteredLinkItems = linkItems(34, "black").filter((item) =>
    item.role.includes(userInfo.role_name)
  );

  return (
    <Layout
      isActive={toDashboard}
      className="flex flex-wrap gap-2 justify-evenly"
      title="Dashboard"
    >
      {filteredLinkItems.map((doc: any) => (
        <Card
          key={doc.href}
          className="max-w-96"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {doc.icon}
            <Typography
              variant="h5"
              color="blue-gray"
              className="my-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {doc.name}
            </Typography>

            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {doc.description}
            </Typography>
          </CardBody>

          <CardFooter
            className="pt-0"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Link to={doc.href} className="inline-block">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                visit site
                <FaLongArrowAltRight size={15} />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </Layout>
  );
}
