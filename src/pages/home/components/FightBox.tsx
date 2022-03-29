import React from "react";
import { useTheme } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import styled from "@emotion/styled";
import Container from "../../../shared/components/container";

type Props = {
  state: string;
  title: string;
};

interface Type {
  recent: Props;
}

const StateDiv = styled.div<{ state: string }>`
  border-radius: 50%;
  background-color: ${({ state }) => state};
  padding: 0.2rem;
`;

const FightBox: React.FC<Type> = ({ recent }) => {
  const theme = useTheme();

  const state =
    recent.state === "solved"
      ? `${theme.palette.yellow}`
      : recent.state === "ongoing"
      ? `${theme.palette.softBrown}`
      : `${theme.palette.brown}`;

  const iconStyle = {
    fontSize: "3rem",
    color: `${theme.palette.white}`,
  };

  return (
    <>
      <div className="container">
        <StateDiv state={state}>
          {recent.state === "solved" ? (
            <CheckIcon sx={{ ...iconStyle }} />
          ) : recent.state === "ongoing" ? (
            <QuestionMarkIcon sx={{ ...iconStyle }} />
          ) : (
            <CloseIcon sx={{ ...iconStyle }} />
          )}
        </StateDiv>
        <div className="issue">
          <p className="label">최근에 싸웠던 일 : </p>
          <p className="title">{recent.title}</p>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          margin: 1rem;
        }

        .issue {
          margin: 0 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .label {
          font-weight: bold;
          font-size: 1.2rem;
        }

        .title {
          font-size: 1.1rem;
        }
      `}</style>
    </>
  );
};

export default FightBox;
