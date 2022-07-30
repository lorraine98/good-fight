import { useTheme } from "@mui/system";
import Button from "src/shared/components/button";
import Container from "src/shared/components/container";

const LinkUser = () => {
  const theme = useTheme();

  return (
    <>
      <Container>
        <div className="wrapper">
          <input
            placeholder="ex) ro1082467slz"
            className="user-code-input"
            type="text"
          />
          <p className="desc">상대방의 유저 코드를 입력해주세요.</p>
          <Button
            style={{
              position: "absolute",
              bottom: "100px",
              width: "94%",
            }}
          >
            연결하기
          </Button>
        </div>
      </Container>

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: "relative";
        }
        .user-code-input {
          border-radius: 8px;
          border: 1px solid ${theme.palette.custom.lightGray};
          width: 100%;
          min-height: 48px;
          padding: 12px;
          text-align: center;
          margin: 72px 0px 8px 0px;
        }
        .desc {
          color: ${theme.palette.custom.gray};
        }
      `}</style>
    </>
  );
};

export default LinkUser;
