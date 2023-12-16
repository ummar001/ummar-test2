import { Spinner } from "@/common/components";
import { Redirect } from "@/common/layout";
import { useVerifyBankSettings } from "@/modules/bank-settings/api";
import { useRouter } from "next/router";

const VerifyBankSettings = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useVerifyBankSettings(id ? id.toString() : "");
    
  if (status === "error") return <Redirect path="/" />;

  return <Spinner />;
};

export default VerifyBankSettings;