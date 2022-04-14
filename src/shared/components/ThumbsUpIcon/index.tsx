import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useTheme } from "@mui/system";

interface Props {
  size: "small" | "medium" | "large" | string;
}

const ThumbsUpIcon = ({ size }: Props) => {
  const theme = useTheme();
  return (
    <ThumbUpOffAltIcon
      sx={{
        fontSize: theme.palette.custom.fontSize[size] || size,
        cursor: "pointer",
      }}
    />
  );
};

export default ThumbsUpIcon;
