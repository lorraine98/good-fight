import { useRouter } from "next/router";
import { useQuery } from "react-query";
import AddButton from "src/shared/components/add-button";
import Container from "src/shared/components/container";
import ContentBox from "./components/ContentBox";
import Spinner from "src/shared/spinner";
import {
  deleteMyFightsData,
  getMyFightsAllData,
  getMyFightsProps,
} from "src/api/my-fights";

const MyFights = () => {
  const { push } = useRouter();
  const { isLoading, data, refetch } = useQuery<getMyFightsProps[]>(
    "myFightsAllData",
    getMyFightsAllData,
  );

  const pushToForm = () => {
    push("my-fights/add-form");
  };

  const deleteContent = async (id: string) => {
    await deleteMyFightsData(id);
    refetch();
  };

  const updateContent = (id: string) => {
    push({ pathname: "my-fights/update-form", query: { docId: id } });
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
              updateContent={updateContent}
            />
          );
        })
      )}
      <AddButton onClick={pushToForm} />
    </Container>
  );
};

export default MyFights;
