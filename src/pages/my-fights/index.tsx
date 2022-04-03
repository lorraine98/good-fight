import { useRouter } from "next/router";
import AddButton from "../../shared/components/add-button";

const MyFights = () => {
  const { push } = useRouter();

  const handleClick = () => {
    push("my-fights/add-form");
  };

  return <AddButton onClick={handleClick} />;
};

export default MyFights;
