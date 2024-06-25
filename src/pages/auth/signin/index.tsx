/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toSignIn } from "../../../utils/constant";

export default function SignIn({ docTitle }: { docTitle: string }) {
  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl m-auto mt-20">
      <div className="text-center">
        <Typography
          variant="h2"
          className="mb-4 font-bold"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Join Us Today
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="text-lg font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Enter your email and password to register.
        </Typography>
      </div>

      <form className="flex flex-col max-w-screen-lg gap-4 mx-auto mt-8 mb-2 w-80 lg:w-1/2">
        <div className="flex flex-col gap-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Your email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Your password
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        </div>

        <Button
          className="mt-6"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Register Now
        </Button>

        <Typography
          variant="paragraph"
          className="mt-4 font-medium text-center text-blue-gray-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Already have an account?
          <Link to={toSignIn} className="ml-1 text-gray-900">
            Sign in
          </Link>
        </Typography>
      </form>
    </div>
  );
}
