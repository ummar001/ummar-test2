import { useAppSelector } from "@/common/hooks";
import { useRouter } from "next/router";
import { FunctionComponent, PropsWithChildren } from "react";
import { Redirect } from "./redirect";

export const LayoutController: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const auth = useAppSelector(state => state.user.user) !== null;
  const router = useRouter();

  if (auth && router.pathname.startsWith("/auth")) {
    return <Redirect path="/" />;
  }

  if (!auth && !router.pathname.startsWith("/auth")) {
    return <Redirect path="/auth/signin" />;
  }

  return <>{children}</>;
};
