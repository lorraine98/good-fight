import { ArrFightsInfo } from "../index";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import MyFightsStatusIcon from "src/shared/components/MyFightsStatusIcon";
import { useTheme } from "@mui/system";

interface Props {
  title: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  data: ArrFightsInfo;
}

const Board = ({ title, onClick, data }: Props) => {
  const theme = useTheme();
  const iconStyle = {
    color: "white",
    fontSize: "1rem",
  };

  return (
    <>
      <div className="board">
        <div className="board-header">
          <p className="title">{title}</p>
          <div className="more-btn" onClick={onClick}>
            더보기 &gt;
          </div>
        </div>
        <div className="board-list">
          <ul className="ul">
            {data.map((list, index) => (
              <li key={index}>
                <div className="wrapper">
                  <p>{list.title}</p>
                  {list.likes && list.hates && (
                    <div className="group">
                      <div className="box">
                        <ThumbUpOffAltIcon sx={{ fontSize: "1rem" }} />
                        <p>{list.likes}</p>
                      </div>
                      <div className="box">
                        <ThumbDownOffAltIcon sx={{ fontSize: "1rem" }} />
                        <p>{list.hates}</p>
                      </div>
                    </div>
                  )}
                  {list.state && (
                    <div className="group">
                      <div className="box">
                        <MyFightsStatusIcon
                          state={list.state}
                          style={iconStyle}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        p {
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        li {
          margin: 0.5rem 0;
          height: 2rem;
          cursor: pointer;
        }

        .board {
          display: flex;
          flex-direction: column;
          border-radius: 0.375rem;
          background-color: ${theme.palette.white};
          height: 11rem;
          margin: 1rem 0;
          padding: 1rem;
          box-sizing: border-box;
        }

        .board-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .title {
          font-weight: bold;
          font-size: 1.3rem;
        }

        .more-btn {
          font-size: 1rem;
          cursor: pointer;
        }

        .wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .group {
          display: flex;
          width: 5rem;
          justify-content: center;
        }

        .box {
          display: flex;
          margin: 0 auto;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Board;
