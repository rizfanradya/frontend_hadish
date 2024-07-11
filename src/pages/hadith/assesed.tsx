/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import DataTable from "react-data-table-component";

type dataType = {
  evaluation_name: string;
  username: string;
}[];

export default function HadithAssesed({ data }: { data?: dataType }) {
  const [open, setOpen] = useState<boolean>(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        color="green"
        size="sm"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        assesed
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Hadish Assesed By
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex flex-col gap-4 h-[calc(100vh-18rem)] overflow-y-scroll"
        >
          <DataTable
            data={data!}
            pagination
            paginationPerPage={50}
            paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
            columns={[
              {
                name: "No",
                selector: (_, index) => index! + 1,
                width: "50px",
                wrap: true,
              },
              {
                name: "User",
                selector: (row: any) => row.username,
                sortable: true,
              },
              {
                name: "Evaluation",
                selector: (row: any) => row.evaluation_name,
                sortable: true,
              },
            ]}
          />
        </DialogBody>

        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
