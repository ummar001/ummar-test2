import { Spinner } from "@/common/components";
import { Redirect } from "@/common/layout";
import { useCreateBankSettings } from "@/modules/bank-settings/api";
import { useRouter } from "next/router";

const CreateBankSettings = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useCreateBankSettings(id ? id.toString() : "");
    
  if (status === "error") return <Redirect path="/" />;

  return <Spinner />;
};

export default CreateBankSettings;