import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useTheme } from "@mui/system";

interface Props {
  size: "small" | "medium" | "large" | string;
  color?: string;
}

const ThumbsDownIcon = ({ size, color }: Props) => {
  const theme = useTheme();
  return (
    <ThumbDownOffAltIcon
      sx={{
        fontSize: theme.palette.custom.fontSize[size] || size,
        cursor: "pointer",
        color: color || "black",
      }}
    />
  );
};

export default ThumbsDownIcon;
