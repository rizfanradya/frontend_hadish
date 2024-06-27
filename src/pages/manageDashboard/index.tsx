/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Layout from "../../components/layout";
import { toManageDashboard } from "../../utils/constant";

export default function ManageDashboard({ docTitle }: { docTitle: string }) {
  useEffect(() => {
    (async () => {
      document.title = docTitle;
    })();
  }, []);

  return (
    <Layout isActive={toManageDashboard}>
      <div></div>
    </Layout>
  );
}
