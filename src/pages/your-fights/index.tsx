import { useRouter } from "next/router";
import AddButton from "../../shared/components/add-button";

const YourFights = () => {
  const { push } = useRouter();

  const handleClick = () => {
    push("your-fights/add-form");
  };

  return <AddButton onClick={handleClick} />;
};

export default YourFights;
