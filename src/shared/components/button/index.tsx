import { useTheme } from "@mui/system";
import React from "react";
import Spinner from "src/shared/spinner";
import { Button as MuiButton } from "@mui/material";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

const Button = ({
  children,
  type = "button",
  onClick,
  isLoading,
  ...props
}: Props) => {
  const theme = useTheme();
  const buttonStyle = {
    background: `${theme.palette.custom.brown}`,
    width: "100%",
    height: "2.7rem",
    border: "none",
    borderRadius: "0.4rem",
    color: `${theme.palette.custom.white}`,
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    ...props,
    "&:hover": {
      background: `${theme.palette.custom.brown}`,
    },
  };

  return (
    <MuiButton
      type={type}
      style={{ ...props.style }}
      onClick={onClick}
      sx={{ ...buttonStyle }}
    >
      {isLoading ? (
        <Spinner size={25} color={theme.palette.custom.white} />
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;
