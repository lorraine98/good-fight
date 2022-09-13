import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useTheme } from "@mui/system";

interface Props {
  size: "small" | "medium" | "large" | string;
  color?: string;
}

const ThumbsUpIcon = ({ size, color }: Props) => {
  const theme = useTheme();
  return (
    <ThumbUpOffAltIcon
      sx={{
        fontSize: theme.palette.custom.fontSize[size] || size,
        cursor: "pointer",
        color: color || "black",
      }}
    />
  );
};

export default ThumbsUpIcon;
