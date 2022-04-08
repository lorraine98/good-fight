import MyFightsStatusIcon from "src/shared/components/MyFightsStatusIcon";
import { StateType } from "..";

const RecentFightBox = ({ recent }: StateType) => {
  return (
    <>
      <div className="container">
        <MyFightsStatusIcon size="medium" state={recent.state} />
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

export default RecentFightBox;
