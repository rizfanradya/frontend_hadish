/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function AdminTableUser({ docTitle }: { docTitle: string }) {
  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  return <></>;
}
