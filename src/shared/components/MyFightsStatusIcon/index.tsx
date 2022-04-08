import { useTheme } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import styled from "@emotion/styled";

export type fightStatusType = "solved" | "willSolve" | "unsolved";

interface Props {
  state: fightStatusType;
  size: "small" | "medium" | "large";
}

const StateDiv = styled.div<{ color: string; fontSize: string }>`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  padding: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyFightsStatusIcon = ({ state, size }: Props) => {
  const theme = useTheme();

  const getColor = () => {
    switch (state) {
      case "solved":
        return `${theme.palette.yellow}`;

      case "willSolve":
        return `${theme.palette.softBrown}`;

      case "unsolved":
        return `${theme.palette.brown}`;

      default:
        return `${theme.palette.white}`;
    }
  };

  const getIcon = () => {
    switch (state) {
      case "solved":
        return (
          <CheckIcon sx={{ fill: theme.palette.white, fontSize: "inherit" }} />
        );

      case "willSolve":
        return (
          <QuestionMarkIcon
            sx={{ fill: theme.palette.white, fontSize: "inherit" }}
          />
        );

      case "unsolved":
        return (
          <CloseIcon sx={{ fill: theme.palette.white, fontSize: "inherit" }} />
        );
    }
  };

  const getSize = () => {
    switch (size) {
      case "large": {
        return {
          width: "3.625rem",
          height: "3.625rem",
        };
      }
      case "medium": {
        return {
          width: "2.625rem",
          height: "2.625rem",
        };
      }
      case "small":
      default: {
        return {
          width: "1.2rem",
          height: "1.2rem",
        };
      }
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "large": {
        return "3rem";
      }
      case "medium": {
        return "2rem";
      }
      case "small":
      default: {
        return "1rem";
      }
    }
  };

  return (
    <div style={getSize()}>
      <StateDiv color={getColor()} fontSize={getFontSize()}>
        {getIcon()}
      </StateDiv>
    </div>
  );
};

export default MyFightsStatusIcon;
