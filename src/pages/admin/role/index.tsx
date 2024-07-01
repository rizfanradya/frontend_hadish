/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../../components/layout";
import { toAdminTableRole } from "../../../utils/constant";

export default function AdminTableRole({ docTitle }: { docTitle: string }) {
  const [hitApi, setHitApi] = useState<boolean>(false);
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
      document.title = docTitle;
    })();
  }, []);

  return (
    <Layout isActive={toAdminTableRole} title="Role Table">
      <div>Role</div>
    </Layout>
  );
}
