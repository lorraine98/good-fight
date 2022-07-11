import React from "react";
import styled from "@emotion/styled";
import { IOptionListType } from "src/api/your-fights";
import { styled as mStyled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useTheme } from "@mui/system";
import Wrapper from "./Wrapper";

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

type Props = {
  lists: IOptionListType;
};
const OptionLists = ({ lists }: Props) => {
  const theme = useTheme();
  const total = lists?.reduce((acc, curr) => (acc += curr.votes), 0);

  return (
    <Wrapper>
      {lists?.map((option, index) => {
        const { optionValue, votes } = option;
        const numberOfVotes =
          total === 0 ? 0 : Math.round((votes / total) * 100);

        return (
          <OptionBox key={index}>
            <BorderLinearProgress variant="determinate" value={numberOfVotes} />
            <Value>{optionValue}</Value>
            <Percentage>{numberOfVotes}%</Percentage>
          </OptionBox>
        );
      })}
      <Total color={theme.palette.custom.gray}>
        {total.toLocaleString("ko-KR")} 명 투표
      </Total>
    </Wrapper>
  );
};

export default OptionLists;
