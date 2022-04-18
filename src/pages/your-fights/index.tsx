import { useRouter } from "next/router";
import OrderByHeader from "./components/OrderByHeader";
import YourFightsBoard from "./components/YourFightsBoard";
import AddButton from "src/shared/components/add-button";
import { useState } from "react";

const YourFights = () => {
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
      <YourFightsBoard selected={selected} />
      <AddButton onClick={pushToForm} />
    </>
  );
};

export default YourFights;
