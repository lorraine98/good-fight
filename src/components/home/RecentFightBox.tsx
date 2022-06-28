import { useTheme } from "@mui/system";
import { CSSProperties } from "react";
import MyFightsStatusIcon, {
  fightStatusType,
} from "src/shared/components/MyFightsStatusIcon";

interface Props {
  content: string;
  solved: fightStatusType;
  style: CSSProperties;
}

const RecentFightBox = ({ content, solved, style }: Props) => {
  const theme = useTheme();

  return (
    <>
      <div className="container" style={style}>
        <MyFightsStatusIcon size="medium" state={solved} />
        <div className="issue">
          <p className="label">최근에 싸웠던 일 : </p>
          <p className="content">{content}</p>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          margin: 1rem;
          background-color: ${theme.palette.custom.white};
          border-radius: 0.375rem;
          width: calc(100% - 2rem);
          height: 5rem;
          padding: 1rem;
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
          padding-bottom: 0.3rem;
        }

        .content {
          font-size: 1.1rem;
        }
      `}</style>
    </>
  );
};

export default RecentFightBox;
