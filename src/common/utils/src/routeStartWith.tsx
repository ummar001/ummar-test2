import { useRouter } from "next/router";

export const useRouteStartsWith = () => {
  const router = useRouter();

  const routeStartsWith = (str: string) => {
    if (str === "/") {
      return router.asPath === "/";
    }

    return router.asPath.startsWith(str);
  };

  return { routeStartsWith };
};
