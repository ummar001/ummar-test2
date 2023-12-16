import { Spinner } from "@/common/components";
import { Redirect } from "@/common/layout";
import { useUpdateBankSettings } from "@/modules/bank-settings/api";
import { useRouter } from "next/router";

const UpdateBankSettings = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useUpdateBankSettings(id ? id.toString() : "");
    
  if (status === "error") return <Redirect path="/" />;

  return <Spinner />;
};

export default UpdateBankSettings;