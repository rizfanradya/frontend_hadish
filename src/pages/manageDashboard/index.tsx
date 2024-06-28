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
      className="flex flex-wrap gap-4 justify-evenly"
    >
      {linkItems.map((doc) => (
        <Card
          key={doc.href}
          className="mt-6 max-w-96"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 mb-4 text-gray-900"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
            </svg>

            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              UI/UX Review Check
            </Typography>

            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Because it&apos;s about motivating the doers. Because I&apos;m
              here to follow my dreams and inspire others.
            </Typography>
          </CardBody>

          <CardFooter
            className="pt-0"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Link to="#" className="inline-block">
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
