import { useTheme } from "@mui/system";
import MyFightsStatusIcon from "src/shared/components/MyFightsStatusIcon";
import { StateType } from "../";

const FightBox = ({ recent }: StateType) => {
  const theme = useTheme();

  const iconStyle = {
    fontSize: "3rem",
    color: `${theme.palette.white}`,
  };

  return (
    <>
      <div className="container">
        <MyFightsStatusIcon state={recent.state} style={iconStyle} />
        <div className="issue">
          <p className="label">최근에 싸웠던 일 : </p>
          <p className="title">{recent.title}</p>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          margin: 1rem;
        }

        .issue {
          margin: 0 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .label {
          font-weight: bold;
          font-size: 1.2rem;
        }

        .title {
          font-size: 1.1rem;
        }
      `}</style>
    </>
  );
};

export default FightBox;
