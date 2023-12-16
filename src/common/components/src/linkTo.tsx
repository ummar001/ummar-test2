import ArrowIcon from "@/common/assets/arrow.png";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface IStoreSettingsProps {
  name: string
  href: string
  testid?: string
}

export const LinkTo: FunctionComponent<IStoreSettingsProps> = ({
  name,
  href,
  testid
}) => {
  return (
    <Box>
      <Link
        href={href}
        data-testid={testid}
        style={{
          color: "#FF5E5D",
          fontWeight: "bold",
          textDecoration: "none",
          marginRight: "8px",
        }}
      >
        {name}
      </Link>{" "}
      <Image src={ArrowIcon} alt="arrow" />{" "}
    </Box>
  );
};
