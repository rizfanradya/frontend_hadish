/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Layout, { linkItems } from "../../components/layout";
import { toManageDashboard } from "../../utils/constant";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ManageDashboard({ docTitle }: { docTitle: string }) {
  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  return (
    <Layout
      isActive={toManageDashboard}
      className="flex flex-wrap gap-2 justify-evenly"
      title="Dashboard"
    >
      {linkItems(34, "black").map((doc) => (
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
