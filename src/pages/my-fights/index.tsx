import { useRouter } from "next/router";
import { useQuery } from "react-query";
import getMyFightsData, { getMyFightsProps } from "src/api/get-my-fights-data";
import AddButton from "src/shared/components/add-button";
import Container from "src/shared/components/container";
import ContentBox from "./components/ContentBox";
import Spinner from "src/shared/spinner";

const MyFights = () => {
  const { push } = useRouter();
  const { isLoading, data: myFightsData } = useQuery<getMyFightsProps[]>(
    "myFightsData",
    getMyFightsData,
  );
  console.log(myFightsData);

  const handleClick = () => {
    push("my-fights/add-form");
  };

  return (
    <Container marginX={2}>
      {isLoading ? (
        <Spinner size={50} />
      ) : (
        myFightsData?.map((res: getMyFightsProps) => {
          const { content, date, feedback, keyword, reason, solved, target } =
            res.data;
          return (
            <ContentBox
              key={keyword}
              content={content}
              date={date}
              feedback={feedback}
              keyword={keyword}
              reason={reason}
              solved={solved}
              target={target}
            />
          );
        })
      )}
      <AddButton onClick={handleClick} />
    </Container>
  );
};

export default MyFights;
