import { FunctionComponent } from "react";
import Image from "next/image";
import LogoAsset from "@/common/assets/logo-white.png";

export const LogoWhite: FunctionComponent = () => {
  return (
    <Image src={LogoAsset} alt={"Waycup Logo"} />
  );
};
