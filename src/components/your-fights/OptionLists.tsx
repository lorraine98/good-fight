import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  getAllVotes,
  getVotedIndex,
  postClickOption,
} from "src/api/your-fights";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useTheme, styled as mStyled } from "@mui/system";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const BorderLinearProgress = mStyled(LinearProgress)(({ theme }) => ({
  width: "100%",
  height: 40,
  borderRadius: 3,
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.custom.progressBar.light
        : theme.palette.custom.progressBar.dark,
  },
}));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OptionBox = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  align-items: center;
  cursor: pointer;
`;

const Value = styled.p`
  display: flex;
  align-items: center;
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

type Props = {
  lists: string[];
  votes: number[];
  pid: string;
  uid: string;
};

const OptionLists = ({ lists, votes, pid, uid }: Props) => {
  const theme = useTheme();
  const [votedIndex, setVotedIndex] = useState(null);
  const [allVotes, setAllVotes] = useState(votes);
  const [total, setTotal] = useState(
    votes.reduce((acc, curr) => (acc += curr), 0),
  );
  const handleClick = (index: number) => {
    postClickOption(pid, uid, index).then((res) => {
      setAllVotes(res);
      setTotal(res?.reduce((acc: number, curr: number) => (acc += curr), 0));
    });
  };

  const linearProgressBar = () => {
    return (
      <>
        {lists?.map((optionValue, index) => {
          const numberOfVotes =
            total === 0 ? 0 : Math.round((allVotes[index] / total) * 100);

          return (
            <OptionBox key={index} onClick={() => handleClick(index)}>
              <BorderLinearProgress
                variant="determinate"
                value={numberOfVotes}
              />
              <Value>
                {index === votedIndex ? <CheckRoundedIcon /> : ""}
                {optionValue}
              </Value>
              <Percentage>{numberOfVotes}%</Percentage>
            </OptionBox>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    (async () => {
      setVotedIndex(await getVotedIndex(pid, uid));
    })();
  }, [allVotes, total]);

  useEffect(() => {
    const timer = setInterval(() => {
      getAllVotes(pid).then((res) => {
        setAllVotes(res);
        setTotal(res?.reduce((acc: number, curr: number) => (acc += curr), 0));
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper>
      {linearProgressBar()}
      <Total color={theme.palette.custom.gray}>
        {total.toLocaleString("ko-KR")} 명 투표
      </Total>
    </Wrapper>
  );
};

export default OptionLists;
