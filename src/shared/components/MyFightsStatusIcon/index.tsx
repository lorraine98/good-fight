import { useTheme, SxProps } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import styled from "@emotion/styled";
import { getIconButtonUtilityClass } from "@mui/material";

interface Props {
  state: string;
  style?: SxProps;
}

const StateDiv = styled.div<{ color: string }>`
  border-radius: 50%;
  background-color: ${({ color }) => color};
  padding: 0.2rem;
`;

const MyFightsStatusIcon = ({ state, style }: Props) => {
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
        return <CheckIcon sx={{ ...style }} />;

      case "willSolve":
        return <QuestionMarkIcon sx={{ ...style }} />;

      case "unsolved":
        return <CloseIcon sx={{ ...style }} />;
    }
  };

  return <StateDiv color={getColor()}>{getIcon()}</StateDiv>;
};

export default MyFightsStatusIcon;
