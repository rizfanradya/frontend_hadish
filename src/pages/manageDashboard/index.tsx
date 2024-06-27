/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Layout from "../components/layout";

export default function ManageDashboard({ docTitle }: { docTitle: string }) {
  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  return (
    <Layout>
      <div></div>
    </Layout>
  );
}
