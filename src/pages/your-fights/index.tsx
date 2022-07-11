import { useRouter } from "next/router";
import OrderByHeader from "./components/OrderByHeader";
import YourFightsBoard from "./components/YourFightsBoard";
import AddButton from "src/shared/components/add-button";
import { useState } from "react";
import { GetStaticProps } from "next";
import { getYourFightsOrderByDate, IDocType } from "src/api/your-fights";

interface Props {
  resultsOrderByDate: IDocType;
  resultsOrderByPopularity: IDocType;
}

const YourFights = ({
  resultsOrderByDate,
  resultsOrderByPopularity,
}: Props) => {
  const { push } = useRouter();

  const [selected, setSelected] = useState<string>("latest");

  const handleClickLatestButton = () => {
    if (selected !== "latest") {
      setSelected("latest");
    }
  };

  const handleClickPopularityButton = () => {
    if (selected !== "popularity") {
      setSelected("popularity");
    }
  };

  const pushToForm = () => {
    push("your-fights/add-form");
  };

  return (
    <>
      <OrderByHeader
        selected={selected}
        onClickLatestButton={handleClickLatestButton}
        onClickPopularityButton={handleClickPopularityButton}
      />
      <YourFightsBoard
        selected={selected}
        resultsOrderByDate={resultsOrderByDate}
        resultsOrderByPopularity={resultsOrderByPopularity}
      />
      <AddButton onClick={pushToForm} />
    </>
  );
};

export default YourFights;

export const getStaticProps: GetStaticProps = async () => {
  const resultsOrderByDate = await getYourFightsOrderByDate();
  const resultsOrderByPopularity = resultsOrderByDate
    ?.slice(0)
    .sort((a, b) => b.likes - a.likes);

  return {
    props: {
      resultsOrderByDate,
      resultsOrderByPopularity,
    },
  };
};
