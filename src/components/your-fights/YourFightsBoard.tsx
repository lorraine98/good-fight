import Container from "src/shared/components/container";
import { useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import { IDocType } from "src/api/your-fights";
import Board from "./Board";

interface Props {
  selected: string;
  resultsOrderByDate: IDocType;
  resultsOrderByPopularity: IDocType;
}

const YourFightsBoard = ({
  selected,
  resultsOrderByDate,
  resultsOrderByPopularity,
}: Props) => {
  const theme = useTheme();
  const [yourFightsOrderByDate, setYourFightsOrderByDate] = useState<IDocType>(
    [],
  );
  const [yourFightsOrderByPopularity, setYourFightsOrderByPopularity] =
    useState<IDocType>([]);

  useEffect(() => {
    if (resultsOrderByDate) {
      setYourFightsOrderByDate(resultsOrderByDate);
    }

    if (resultsOrderByPopularity) {
      setYourFightsOrderByPopularity(resultsOrderByPopularity);
    }
  }, []);

  const getYourFights = (yourFights: IDocType) =>
    yourFights.map((data) => <Board key={data.pid} data={data} />);

  return (
    <>
      <Container marginX={1}>
        {getYourFights(
          selected === "latest"
            ? yourFightsOrderByDate
            : yourFightsOrderByPopularity,
        )}
      </Container>
      <style jsx>{`
        .board {
          display: flex;
          flex-direction: column;
          background-color: ${theme.palette.custom.white};
          border-radius: 0.375rem;
          width: 100%;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .profile {
          display: flex;
        }

        .avatar {
          display: flex;
          width: 40px;
          height: 40px;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          margin-right: 1rem;
          background-color: skyBlue;
        }

        .icon {
          width: 75%;
          height: 75%;
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .nickname {
          font-size: 1rem;
          font-weight: 600;
        }

        .date {
          font-size: 0.9rem;
          color: ${theme.palette.gray};
        }

        .content {
          margin: 1rem 0;
          font-size: 1.1rem;
          line-height: 1.5;
        }

        .option {
          display: flex;
          position: relative;
          width: 100%;
          margin: 1rem 0;
          align-items: center;
        }

        .value {
          font-size: 1rem;
          position: absolute;
          left: 0.7rem;
          z-index: 100;
        }
        .percentage {
          font-size: 0.9rem;
          position: absolute;
          right: 0.7rem;
          z-index: 100;
        }

        .total {
          font-size: 0.9rem;
          margin-left: 0.7rem;
          color: ${theme.palette.custom.gray};
          font-weight: 450;
        }

        .empathy {
          display: flex;
          align-items: center;
          margin: 1rem 0;
        }

        .empathy > div {
          display: flex;
          align-items: center;
          margin-right: 1rem;
        }

        .empathy > div > p {
          font-size: 0.9rem;
          margin: 0 0.5rem;
        }
      `}</style>
    </>
  );
};

export default YourFightsBoard;
