import { useTheme } from "@mui/system";
import React from "react";
import { TailSpin } from "react-loader-spinner";

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
          <div className="spinner-wrapper">
            <TailSpin color={theme.palette.white} height={25} width={25} />
          </div>
        ) : (
          children
        )}
      </button>
      <style jsx>{`
        .button {
          background: ${theme.palette.brown};
          width: 100%;
          height: 2.7rem;
          border: none;
          border-radius: 0.4rem;
          color: ${theme.palette.white};
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }
        .spinner-wrapper {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default Button;
