import { AddCircle } from "@mui/icons-material";
import { useTheme } from "@mui/system";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AddButton = ({ onClick }: Props) => {
  const theme = useTheme();

  return (
    <button onClick={onClick}>
      <AddCircle
        sx={{
          color: theme.palette.brown,
          boxShadow: 2,
          fontSize: 100,
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
