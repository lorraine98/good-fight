import { AddCircle } from "@mui/icons-material";
import { useTheme } from "@mui/system";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AddButton = ({ onClick }: Props) => {
  const theme = useTheme();

  return (
    <button onClick={onClick}>
      <AddCircle
        sx={{
          color: theme.palette.custom.brown,
          boxShadow:
            "rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",
          fontSize: 100,
          borderRadius: 50,
          zIndex: 3,
          cursor: "pointer",
          position: "absolute",
          bottom: 80,
          right: 30,
        }}
      />
    </button>
  );
};

export default AddButton;
