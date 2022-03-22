import { getAuth, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authUserState } from "../../atoms/user";
import Button from "../../shared/components/button";
import Container from "../../shared/components/container";
import { loginGoogle } from "./api/auth-google-login";
import logo from "../../shared/img/logo.png";
import Image from "next/image";
import { useTheme } from "@emotion/react";

export default function AuthPage() {
  const auth = getAuth();
  const theme = useTheme();
  const { push } = useRouter();
  const setIsAuthenticated = useSetRecoilState(authUserState);

  if (!auth) {
    setIsAuthenticated(false);
  }

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        const user = result?.user;
        setIsAuthenticated(true);
        user && push("/");
      })
      .catch((error) => {
        console.error(error.code);
      });
  }, [auth]);

  const handleClick = () => {
    loginGoogle();
  };

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
        <Button onClick={handleClick}>구글로 로그인하기</Button>
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
          background-color: ${theme.colors.brown};
          animation-name: rotate-1;
        }
        .square2 {
          background-color: ${theme.colors.softBrown};
          animation-name: rotate-2;
        }
        .square3 {
          background-color: ${theme.colors.yellow}
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
