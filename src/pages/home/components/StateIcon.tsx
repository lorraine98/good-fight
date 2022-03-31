import { useTheme, SxProps } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import styled from "@emotion/styled";

interface Props {
  state: string;
  style?: SxProps;
}

const StateDiv = styled.div<{ color: string }>`
  border-radius: 50%;
  background-color: ${({ color }) => color};
  padding: 0.2rem;
`;

const StateIcon = ({ state, style }: Props) => {
  const theme = useTheme();

  const color =
    state === "solved"
      ? `${theme.palette.yellow}`
      : state === "willSolve"
      ? `${theme.palette.softBrown}`
      : `${theme.palette.brown}`;

  return (
    <StateDiv color={color}>
      {state === "solved" ? (
        <CheckIcon sx={{ ...style }} />
      ) : state === "willSolve" ? (
        <QuestionMarkIcon sx={{ ...style }} />
      ) : (
        <CloseIcon sx={{ ...style }} />
      )}
    </StateDiv>
  );
};

export default StateIcon;
