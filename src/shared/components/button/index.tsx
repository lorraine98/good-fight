import { lightTheme as theme } from "../../../styles/theme";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button = ({ children, type = "button", onClick, ...props }: Props) => {
  return (
    <>
      <button
        className="button"
        type={type}
        style={{ ...props.style }}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
      <style jsx>{`
        .button {
          background: ${theme.colors.brown};
          width: 100%;
          height: 2.7rem;
          border: none;
          border-radius: 0.4rem;
          color: ${theme.colors.white};
          font-size: 1rem;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default Button;
