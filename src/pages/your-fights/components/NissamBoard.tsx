import Container from "src/shared/components/container";
import { useTheme } from "@mui/system";
import styled from "@emotion/styled";
import { styled as mStyled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import getRandomNickname from "src/api/get-random-nickname";
import getYourFights from "src/api/get-your-fights";
import { useEffect } from "react";

const StyledPath = styled.path<{ currentColor: string }>`
  fill: ${({ currentColor }) => currentColor};
  stroke: ${({ currentColor }) => currentColor};
`;

const BorderLinearProgress = mStyled(LinearProgress)(({ theme }) => ({
  width: "100%",
  height: 40,
  borderRadius: 3,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    border: "2px solid #759bc8",
    backgroundColor: "white",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
    backgroundColor: theme.palette.mode === "light" ? "#dbeffe" : "#308fe8",
  },
}));

const NissamBoard = () => {
  const theme = useTheme();

  const iconStyle = {
    fontSize: "1.2rem",
    cursor: "pointer",
  };

  useEffect(() => {
    const getNickname = async () => {
      const result = await getRandomNickname();
      const r2 = await getYourFights();
    };
  }, []);

  return (
    <>
      <Container marginX={1}>
        <div className="board">
          <div className="profile">
            <div className="avatar">
              <svg
                className="icon"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="PersonIcon"
              >
                <StyledPath
                  className="path"
                  currentColor={
                    "#" + Math.floor(Math.random() * 16777215).toString(16)
                  }
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                ></StyledPath>
              </svg>
            </div>
            <div className="wrapper">
              <div className="nickname">저주받은 프로도</div>
              <div className="date">2주 전</div>
            </div>
          </div>
          <div className="content"></div>
          <div className="votes">
            <div className="option">
              <BorderLinearProgress variant="determinate" value={0} />
              <p className="value"></p>
              <p className="percentage">
                {/* {Math.round(].votes * 100) / total)}% */}
              </p>
            </div>
            <div className="option">
              <BorderLinearProgress variant="determinate" value={0} />
              <p className="value"></p>
              <p className="percentage">
                {/* {Math.round(].votes * 100) / total)}% */}
              </p>
            </div>
            <div className="total">명 투표</div>
          </div>
          <div className="empathy">
            <div className="like">
              <ThumbUpOffAltIcon sx={{ ...iconStyle }} />
              <p></p>
            </div>
            <div className="hate">
              <ThumbDownOffAltIcon sx={{ ...iconStyle }} />
              <p></p>
            </div>
            <div className="hate"></div>
          </div>
        </div>
      </Container>
      <style jsx>{`
        .board {
          display: flex;
          flex-direction: column;
          background-color: ${theme.palette.custom.white};
          border-radius: 0.375rem;
          width: 100%;
          padding: 1rem;
        }

        .profile {
          display: flex;
        }

        .avatar {
          display: flex;
          width: 40px;
          height: 40px;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          margin-right: 1rem;
          background-color: skyBlue;
        }

        .icon {
          width: 75%;
          height: 75%;
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .nickname {
          font-size: 1rem;
          font-weight: 600;
        }

        .date {
          font-size: 0.9rem;
          color: ${theme.palette.custom.gray};
        }

        .content {
          margin: 1rem 0;
          font-size: 1.1rem;
          line-height: 1.5;
        }

        .option {
          display: flex;
          position: relative;
          width: 100%;
          margin: 1rem 0;
          align-items: center;
        }

        .value {
          font-size: 1rem;
          position: absolute;
          left: 0.7rem;
          z-index: 100;
        }
        .percentage {
          font-size: 0.9rem;
          position: absolute;
          right: 0.7rem;
          z-index: 100;
        }

        .total {
          font-size: 0.9rem;
          margin-left: 0.7rem;
          color: ${theme.palette.custom.gray};
          font-weight: 450;
        }

        .empathy {
          display: flex;
          align-items: center;
          margin: 1rem 0;
        }

        .empathy > div {
          display: flex;
          align-items: center;
          margin-right: 1rem;
        }

        .empathy > div > p {
          font-size: 0.9rem;
          margin: 0 0.5rem;
        }
      `}</style>
    </>
  );
};

export default NissamBoard;
