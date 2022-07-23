import { useTheme } from "@mui/system";
import { useRouter } from "next/router";

const LoginTextButton = ({ ...props }) => {
  const { push } = useRouter();
  const theme = useTheme();

  const onClick = () => {
    push("/auth");
  };

  return (
    <>
      <div className="login-wrapper" onClick={onClick} {...props}>
        <span className="login-text">로그인 하기</span>
      </div>
      <style jsx>{`
        .login-wrapper {
          text-align: center;
          color: ${theme.palette.custom.gray};
          cursor: pointer;
          z-index: 2;
        }

        .login-text {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default LoginTextButton;
