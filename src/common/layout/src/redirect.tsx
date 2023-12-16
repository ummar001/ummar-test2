import { Spinner } from "@/common/components";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";

interface IRedirectProps {
  path: string;
}

export const Redirect: FunctionComponent<IRedirectProps> = ({ path }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(path);
  }, [router, path]);

  return <Spinner />;
};
