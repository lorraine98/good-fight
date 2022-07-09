import Button from "src/shared/components/button";
import logo from "src/shared/img/logo.png";
import Image from "next/image";
import { useTheme } from "@mui/system";
import shortUUID from "short-uuid";
import { useRef } from "react";
import { useSnackbar } from "notistack";
import { SnackbarOrigin } from "@mui/material";
import Router from "next/router";

const UserShareCode = () => {
  const theme = useTheme();
  const { push } = Router;
  const { enqueueSnackbar } = useSnackbar();
  const uuid = shortUUID.generate();
  const codeRef = useRef<HTMLSpanElement>(null);

  const anchorOrigin: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "center",
  };

  const copyCode = async () => {
    const value = codeRef?.current?.textContent;
    if (!value) {
      enqueueSnackbar("다시 시도해주세요.", { variant: "error", anchorOrigin });
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      enqueueSnackbar("복사 되었습니다.", {
        variant: "success",
        anchorOrigin,
        autoHideDuration: 1500,
      });
    } catch (error) {
      enqueueSnackbar(error, { variant: "error", anchorOrigin });
    }
  };

  return (
    <>
      <div className="img">
        <Image src={logo} alt="logo" width={80} height={80} />
      </div>
      <p className="title">공유 코드예요!</p>
      <p className="desc">아래 코드로 상대방과 연결할 수 있어요.</p>
      <span className="code" ref={codeRef}>
        {uuid}
      </span>
      <Button onClick={copyCode} style={{ width: "268px" }}>
        복사하기
      </Button>
      <button className="know-code" onClick={() => push("link-user")}>
        상대방의 코드를 알고 있어요!
      </button>
      <style jsx>{`
        .img {
          margin-top: 28px;
        }
        .title {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 24px 0;
        }
        .code {
          border: 1px solid ${theme.palette.custom.gray};
          min-width: 268px;
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0 12px 0;
          text-align: center;
        }
        .know-code {
          text-decoration: underline;
          color: ${theme.palette.custom.gray};
          margin-top: 36px;
        }
      `}</style>
    </>
  );
};

export default UserShareCode;
