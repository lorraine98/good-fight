import { useTheme } from "@mui/system";
import React from "react";
import Spinner from "src/shared/spinner";

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

  return (
    <>
      <button
        className="button"
        type={type}
        style={{ ...props.style }}
        onClick={onClick}
        {...props}
      >
        {isLoading ? (
          <Spinner size={25} color={theme.palette.custom.white} />
        ) : (
          children
        )}
      </button>
      <style jsx>{`
        .button {
          background: ${theme.palette.custom.brown};
          width: 100%;
          height: 2.7rem;
          border: none;
          border-radius: 0.4rem;
          color: ${theme.palette.custom.white};
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Button;
