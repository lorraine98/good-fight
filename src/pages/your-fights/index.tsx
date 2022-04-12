import { useRouter } from "next/router";
import OrderBy from "./components/OrderBy";
import YourFightsBoard from "./components/YourFightsBoard";
import AddButton from "src/shared/components/add-button";

const YourFights = () => {
  const {push} = useRouter();
  
  const pushToForm = () => {
    push("your-fights/add-form");
  }

  return (
    <>
      <OrderBy />
      <YourFightsBoard />
      <AddButton onClick={pushToForm}/>
    </>
  );
};

export default YourFights;
