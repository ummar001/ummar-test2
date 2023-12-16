import { Spinner } from "@/common/components";
import { Redirect } from "@/common/layout";
import { useConfirmUserEmail } from "@/modules/auth/api";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

const ConfirmEmail: FunctionComponent = () => {
  const token = useRouter().query.id as string;
  const enabled = token !== undefined;
  const { isLoading } = useConfirmUserEmail({ enabled }, token);

  if (!isLoading) return <Redirect path="/" />;

  return <Spinner />;
};

export default ConfirmEmail;
