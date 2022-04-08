import { useTheme } from "@mui/system";
import MyFightsStatusIcon from "src/shared/components/MyFightsStatusIcon";

const ContentBox = () => {
  const theme = useTheme();

  return (
    <>
      <div className="wrapper">
        <MyFightsStatusIcon state="solved" size="large" />
        설거지 안함 설거지 안함
      </div>
      <style jsx>{`
        .wrapper {
          background: ${theme.palette.white};
          border-radius: 0.375rem;
        }
      `}</style>
    </>
  );
};

export default ContentBox;
