/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function UserDashboard({ docTitle }: { docTitle: string }) {
  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  return <div>HELLO WORLD</div>;
}
