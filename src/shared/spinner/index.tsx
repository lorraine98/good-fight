import { useTheme } from "@mui/system";
import { TailSpin } from "react-loader-spinner";

interface Props {
  size: string | number | undefined;
  color?: string;
}

const Spinner = ({ size, color }: Props) => {
  const theme = useTheme();

  return (
    <>
      <div className="spinner-wrapper">
        <TailSpin
          color={color ?? theme.palette.custom.brown}
          height={size}
          width={size}
        />
      </div>

      <style jsx>{`
        .spinner-wrapper {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default Spinner;
