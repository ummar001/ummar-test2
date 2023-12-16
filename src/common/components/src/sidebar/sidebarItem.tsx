import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FunctionComponent } from "react";

interface ISideBarItemProps {
  label: string
  icon: React.ReactElement
  isSelected?: boolean
}

export const SideBarItem: FunctionComponent<ISideBarItemProps> = ({
  icon,
  label,
  isSelected,
}) => {
  return (
    <ListItem
      sx={{
        padding: "1rem 1.5rem",
        marginLeft: "-1.1rem",
        borderRadius: 4,
        backgroundColor: isSelected ? "#FFF1F1" : "",
        color: isSelected ? "#F75554" : "",
        cursor: isSelected ? "pointer" : "",
        fontWeight: isSelected ? "bold" : "regular",
        "& *": {
          color: isSelected ? "#F75554" : "",
          fill: isSelected ? "#F75554" : "",
          fontWeight: isSelected ? "bold" : "",
        },
        "&:hover": {
          backgroundColor: "#FFF1F1",
          cursor: "pointer",
          "& *": {
            color: "#F75554",
            fill: "#F75554",
            fontWeight: "bold",
          },
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={label}
        sx={{
          marginLeft: "-1rem",
          color: isSelected ? "#F75554" : "",
          fontWeight: isSelected ? "bold" : "regular",
          "&:hover": {
            color: "#F75554",
            fill: "#F75554",
            fontWeight: "bold",
          },
        }}
      />
    </ListItem>
  );
};
