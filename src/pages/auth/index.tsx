import Button from "src/shared/components/button";
import Container from "src/shared/components/container";
import { loginGoogle, setUser } from "src/api/auth";
import logo from "src/shared/img/logo.png";
import Image from "next/image";
import { useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import { useAuth } from "src/shared/hooks/useAuth";

export default function AuthPage() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthorized, currentUser } = useAuth();

  const handleClick = () => {
    setIsLoading(true); //단순히 여기서만 true로 처리하고 넘어가도 될지?
    loginGoogle();
  };

  useEffect(() => {
    if (isAuthorized) {
      setUser(currentUser?.uid ?? "");
    }
  }, [isAuthorized]);

  return (
    <>
      <Container>
        <div className="logo-wrapper">
          <div className="square square1" />
          <div className="square square2" />
          <div className="square square3" />
          <Image
            className="logo"
            src={logo}
            alt="니쌈내쌈"
            width={100}
            height={100}
          />
        </div>
        <div className="spacing" />
        <Button onClick={handleClick} isLoading={isLoading}>
          구글로 로그인하기
        </Button>
      </Container>
      <style jsx>{`
        .spacing {
          margin-top: 20rem;
        }
        .logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 16rem;
        }
        .logo {
          position: relative;
        }
        .square {
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 20%;
          mix-blend-mode: multiply;
          animation: 2s infinite;
        }
        .square1 {
          background-color: ${theme.palette.custom.brown};
          animation-name: rotate-1;
        }
        .square2 {
          background-color: ${theme.palette.custom.softBrown};
          animation-name: rotate-2;
        }
        .square3 {
          background-color: ${theme.palette.custom.yellow}
          animation-name: rotate-3;
        }

        @keyframes rotate-1 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(180deg);
          }
        }
        @keyframes rotate-2 {
          from {
            transform: rotate(45deg);
          }
          to {
            transform: rotate(225deg);
          }
        }
        @keyframes rotate-3 {
          from {
            transform: rotate(90deg);
          }
          to {
            transform: rotate(270deg);
          }
        }
      `}</style>
    </>
  );
}
