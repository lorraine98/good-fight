import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import MyFightsStatusIcon from "src/shared/components/MyFightsStatusIcon";
import { useTheme } from "@mui/system";
import Spinner from "src/shared/spinner";

import { useAuth } from "src/pages/auth/hook/useAuth";
import { FightsInfo } from "src/pages/home";
import LoginTextButton from "../common/LoginTextButton";

interface Props {
  content: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  data?: FightsInfo[];
  isLoading?: boolean;
}

const Board = ({ content, onClick, data, isLoading }: Props) => {
  const theme = useTheme();
  const isAuthorized = useAuth();

  return (
    <>
      <div className="board" onClick={onClick}>
        <div className="board-header">
          <p className="content">{content}</p>
          <div className="more-btn">더보기 &gt;</div>
        </div>
        {!isAuthorized && content === "내쌈" ? (
          <LoginTextButton style={{ marginTop: "2.3rem" }} />
        ) : (
          <div className="board-list">
            <ul className="ul">
              {isLoading ? (
                <Spinner size={50} />
              ) : (
                data?.map((list, index) => (
                  <li key={index}>
                    <div className="wrapper">
                      <p>{list.content}</p>
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
                      {list.solved && (
                        <div className="group">
                          <div className="box">
                            <MyFightsStatusIcon
                              size="small"
                              state={list.solved}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
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
          background-color: ${theme.palette.custom.white};
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
        .content {
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
