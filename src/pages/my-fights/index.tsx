import { useRouter } from "next/router";
import { useQuery } from "react-query";
import getMyFightsData, { getMyFightsProps } from "./api/get-my-fights-data";
import AddButton from "src/shared/components/add-button";
import Container from "src/shared/components/container";
import ContentBox from "./components/ContentBox";
import Spinner from "src/shared/spinner";
import deleteMyFightsData from "./api/delete-my-fights-data";

const MyFights = () => {
  const { push } = useRouter();
  const { isLoading, data, refetch } = useQuery<getMyFightsProps[]>(
    "myFightsData",
    getMyFightsData,
  );

  const pushToForm = () => {
    push("my-fights/add-form");
  };

  const deleteContent = async (id: string) => {
    await deleteMyFightsData(id);
    refetch();
  };

  return (
    <Container marginX={2}>
      {isLoading ? (
        <Spinner size={50} />
      ) : (
        data?.map((res: getMyFightsProps) => {
          const { docId } = res;
          const { content, date, feedback, keyword, reason, solved, target } =
            res.data;

          return (
            <ContentBox
              key={docId}
              docId={docId}
              content={content}
              date={date}
              feedback={feedback}
              keyword={keyword}
              reason={reason}
              solved={solved}
              target={target}
              deleteContent={deleteContent}
            />
          );
        })
      )}
      <AddButton onClick={pushToForm} />
    </Container>
  );
};

export default MyFights;
