import MyFightsStatusIcon from "src/shared/components/MyFightsStatusIcon";
import { IRecentFightInfo } from "../components/Photo";

const RecentFightBox = ({ content, state }: IRecentFightInfo) => {
  return (
    <>
      <div className="container">
        <MyFightsStatusIcon size="medium" state={state} />
        <div className="issue">
          <p className="label">최근에 싸웠던 일 : </p>
          <p className="title">{content}</p>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          margin: 1rem;
          width: 100%;
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

export default RecentFightBox;
