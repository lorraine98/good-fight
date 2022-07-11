import Container from "src/shared/components/container";
import ThumbsUpIcon from "src/shared/components/ThumbsUpIcon";
import ThumbsDownIcon from "src/shared/components/ThumbsDownIcon";
import Wrapper from "./Wrapper";
import { useTheme } from "@mui/system";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  getYourFightsOrderByDate,
  getYourFightsOrderByPopularity,
  postLike,
  postHate,
  postCancelLike,
  postCancelHate,
  IOptionListType,
  IDocType,
} from "src/api/your-fights";
import DateFormat from "src/shared/functions/DateFormat";
import Avatar from "boring-avatars";
import OptionLists from "./OptionLists";

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

interface Props {
  selected: string;
  resultsOrderByDate: IDocType;
  resultsOrderByPopularity: IDocType;
}

const YourFightsBoard = ({
  selected,
  resultsOrderByDate,
  resultsOrderByPopularity,
}: Props) => {
  const theme = useTheme();
  const [yourFightsOrderByDate, setYourFightsOrderByDate] = useState<IDocType>(
    [],
  );
  const [yourFightsOrderByPopularity, setYourFightsOrderByPopularity] =
    useState<IDocType>([]);

  useEffect(() => {
    if (resultsOrderByDate) {
      setYourFightsOrderByDate(resultsOrderByDate);
    }

    if (resultsOrderByPopularity) {
      setYourFightsOrderByPopularity(resultsOrderByPopularity);
    }
  }, []);

  const handleClickLike = async (pid: string) => {
    if (pid) {
      await postCancelHate(pid);
    }

    if (pid) {
      await postCancelLike(pid);
    } else {
      // await postLike(pid);
    }
  };

  const handleClickHate = async (pid: string) => {
    if (pid) {
      await postCancelLike(pid);
    }

    if (pid) {
      await postCancelHate(pid);
    } else {
      await postHate(pid);
    }
  };

  const getEmpathy = (pid: string, likes: number, hates: number) => {
    return (
      <Empathy>
        <EmpathyWrapper onClick={() => handleClickLike(pid)}>
          {likes ? (
            <ThumbsUpIcon size="1.7rem" color={theme.palette.blue} />
          ) : (
            <ThumbsUpIcon size="1.7rem" />
          )}
          <p>{likes}</p>
        </EmpathyWrapper>
        <EmpathyWrapper onClick={() => handleClickHate(pid)}>
          {hates ? (
            <ThumbsDownIcon size="1.7rem" color={theme.palette.blue} />
          ) : (
            <ThumbsDownIcon size="1.7rem" />
          )}
          <p>{hates}</p>
        </EmpathyWrapper>
      </Empathy>
    );
  };

  const getYourFights = (yourFights: IDocType) => {
    return yourFights.map((fight, index) => {
      const {
        pid,
        createdAt,
        uid,
        nickname,
        content,
        optionList,
        likes,
        hates,
      } = fight;

      return (
        <Board key={index} backgroundColor={theme.palette.custom.white}>
          <Profile>
            <Avatar
              size={40}
              variant="beam"
              name={nickname}
              colors={["#064789", "#427AA1", "#EBF2FA", "#679436", "#A5BE00"]}
            />
            <Wrapper style={{ marginLeft: "0.8rem" }}>
              <Nickname>{nickname}</Nickname>
              <Date color={theme.palette.gray}>{DateFormat(createdAt)}</Date>
            </Wrapper>
          </Profile>
          <Content>{content}</Content>
          <OptionLists lists={optionList} />
          {getEmpathy(pid, likes, hates)}
        </Board>
      );
    });
  };

  return (
    <>
      <Container marginX={1}>
        {getYourFights(
          selected === "latest"
            ? yourFightsOrderByDate
            : yourFightsOrderByPopularity,
        )}
      </Container>
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
