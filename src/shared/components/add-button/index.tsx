import { AddCircleRounded } from "@mui/icons-material";
import { useTheme } from "@mui/system";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AddButton = ({ onClick }: Props) => {
  const theme = useTheme();

  return (
    <>
      <button onClick={onClick}>
        <div className="background" />
        <AddCircleRounded
          sx={{
            color: theme.palette.custom.brown,
            fontSize: 80,
            borderRadius: 50,
            zIndex: 3,
            cursor: "pointer",
            position: "absolute",
            bottom: 80,
            right: 30,
          }}
        />
      </button>
      <style jsx>{`
        .background {
          position: absolute;
          bottom: 87px;
          right: 37px;
          background-color: white;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          filter: drop-shadow(0px 8px 3px rgb(0 0 0 / 40%));
        }
      `}</style>
    </>
  );
};

export default AddButton;
