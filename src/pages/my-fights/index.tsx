import { useRouter } from "next/router";
import AddButton from "src/shared/components/add-button";
import Container from "src/shared/components/container";
import ContentBox from "./components/ContentBox";

const MyFights = () => {
  const { push } = useRouter();

  const handleClick = () => {
    push("my-fights/add-form");
  };

  return (
    <Container marginX={2}>
      <ContentBox />
      <AddButton onClick={handleClick} />
    </Container>
  );
};

export default MyFights;
