import Container from "../../shared/components/container";
import Photo from "./components/Photo";
import Banner from "./components/Banner";
import Board from "./components/Board";

const index = () => {
  return (
    <>
      <Container marginX={1}>
        <Photo />
        <Banner />
        <Board title="니쌈" />
        <Board title="내쌈" />
      </Container>
    </>
  );
};

export default index;
