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
        return `${theme.palette.custom.yellow}`;

      case "willSolve":
        return `${theme.palette.custom.softBrown}`;

      case "unsolved":
        return `${theme.palette.custom.brown}`;

      default:
        return `${theme.palette.custom.white}`;
    }
  };

  const getIcon = () => {
    switch (state) {
      case "solved":
        return (
          <CheckIcon
            sx={{ fill: theme.palette.custom.white, fontSize: "inherit" }}
          />
        );

      case "willSolve":
        return (
          <QuestionMarkIcon
            sx={{ fill: theme.palette.custom.white, fontSize: "inherit" }}
          />
        );

      case "unsolved":
        return (
          <CloseIcon
            sx={{ fill: theme.palette.custom.white, fontSize: "inherit" }}
          />
        );
    }
  };

  return (
    <div style={theme.palette.custom.iconSize[size]}>
      <StateDiv
        color={getColor()}
        fontSize={theme.palette.custom.fontSize[size]}
      >
        {getIcon()}
      </StateDiv>
    </div>
  );
};

export default MyFightsStatusIcon;
