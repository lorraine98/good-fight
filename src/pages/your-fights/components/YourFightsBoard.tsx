import Container from "src/shared/components/container";
import ThumbsUpIcon from "src/shared/components/ThumbsUpIcon";
import ThumbsDownIcon from "src/shared/components/ThumbsDownIcon";
import { useTheme } from "@mui/system";
import styled from "@emotion/styled";
import { styled as mStyled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import getYourFights from "src/api/get-your-fights";
import { useEffect, useState } from "react";
import { IOptionListType, IDocType, LikesType } from "src/api/get-your-fights";

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

const StyledPath = styled.path<{ currentColor: string }>`
  fill: ${({ currentColor }) => currentColor};
  stroke: ${({ currentColor }) => currentColor};
`;

const Board = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  border-radius: 0.375rem;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Profile = styled.div`
  display: flex;
`;

const Avatar = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1rem;
  background-color: skyBlue;
`;

const Svg = styled.svg`
  width: 75%;
  height: 75%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Nickname = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const Date = styled.p<{ color: string }>`
  font-size: 0.9rem;
  color: ${({ color }) => color};
`;

const Content = styled.p`
  margin: 1rem 0;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const OptionBox = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  align-items: center;
`;

const Value = styled.p`
  font-size: 1rem;
  position: absolute;
  left: 0.7rem;
  z-index: 100;
`;

const Percentage = styled.p`
  font-size: 0.9rem;
  position: absolute;
  right: 0.7rem;
  z-index: 100;
`;

const Total = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-left: 0.3rem;
  color: ${({ color }) => color};
  font-weight: 450;
`;

const Empathy = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const EmpathyWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  & > p {
    margin: 0 1rem 0 0.5rem;
  }
`;

const YourFightsBoard = () => {
  const theme = useTheme();
  const [yourFightsOrderByDate, setYourFightsOrderByDate] = useState<IDocType>(
    [],
  );
  const [yourFightsOrderByPopular, setYourFightsOrderByPopular] =
    useState<IDocType>([]);

  useEffect(() => {
    const getAllYourFights = async () => {
      const result = await getYourFights();

      if (!result) {
        return;
      }

      setYourFightsOrderByDate(result);
    };

    getAllYourFights();
  }, []);

  const getEmpathy = (likes: LikesType) => {
    return (
      <Empathy>
        <EmpathyWrapper>
          <ThumbsUpIcon size="1.7rem" />
          <p>{likes.like}</p>
        </EmpathyWrapper>
        <EmpathyWrapper>
          <ThumbsDownIcon size="1.7rem" />
          <p>{likes.hate}</p>
        </EmpathyWrapper>
      </Empathy>
    );
  };

  const getOptionList = (optionList: IOptionListType) => {
    const total = optionList.reduce((acc, curr) => (acc += curr.votes), 0);

    return (
      <Wrapper>
        {optionList.map((option, index) => {
          const { optionValue, votes } = option;
          const result = (Math.round(votes / total) || 0) * 100;

          return (
            <OptionBox key={index}>
              <BorderLinearProgress variant="determinate" value={result} />
              <Value>{optionValue}</Value>
              <Percentage>{result}%</Percentage>
            </OptionBox>
          );
        })}
        <Total color={theme.palette.custom.gray}>
          {total.toLocaleString("ko-KR")} 명 투표
        </Total>
      </Wrapper>
    );
  };

  const recentlyYourFights = () => {
    return yourFightsOrderByDate.map((fight, index) => {
      const { data, user } = fight;
      const { content, optionList, likes } = data;
      const { uid, nickname } = user;

      return (
        <Board key={index} backgroundColor={theme.palette.custom.white}>
          <Profile>
            <Avatar>
              <Svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <StyledPath
                  currentColor={
                    "#" + Math.floor(Math.random() * 16777215).toString(16)
                  }
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                ></StyledPath>
              </Svg>
            </Avatar>
            <Wrapper>
              <Nickname>{nickname}</Nickname>
              <Date color={theme.palette.gray}>??</Date>
            </Wrapper>
          </Profile>
          <Content>{content}</Content>
          {getOptionList(optionList)}
          {getEmpathy(likes)}
        </Board>
      );
    });
  };

  return (
    <>
      <Container marginX={1}>{recentlyYourFights()}</Container>
      <style jsx>{`
        .board {
          display: flex;
          flex-direction: column;
          background-color: ${theme.palette.custom.white};
          border-radius: 0.375rem;
          width: 100%;
          padding: 1rem;
          margin-bottom: 1rem;
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
          color: ${theme.palette.gray};
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

export default YourFightsBoard;
