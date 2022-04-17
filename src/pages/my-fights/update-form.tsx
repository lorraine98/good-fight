import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  getMyFightsData,
  getMyFightsProps,
  postMyFightsProps,
  updateMyFightsData,
} from "src/api/my-fights";
import Button from "src/shared/components/button";
import Container from "src/shared/components/container";
import FormInput from "src/shared/components/form-input";
import FormSelect from "src/shared/form-select";

const MyFightsUpdateForm = () => {
  const { register, handleSubmit } = useForm<postMyFightsProps>();
  const [myFightsData, setMyFightsData] = useState<
    getMyFightsProps | DocumentData
  >();
  const { query, push } = useRouter();
  const docId = typeof query.docId === "string" ? query.docId : "";

  useEffect(() => {
    async function fetchMyFightsData() {
      const res = await getMyFightsData(docId);
      setMyFightsData(res);
    }

    fetchMyFightsData();
  }, []);

  const { content, date, feedback, keyword, reason, solved, target } =
    myFightsData?.data ?? {};

  const onSubmit: SubmitHandler<postMyFightsProps> = (data) => {
    updateMyFightsData({ ...data, docId }).then(() => push("/my-fights"));
  };

  return (
    <>
      {myFightsData && (
        <Container marginX={2}>
          <p className="title">변화가 생겼나요?</p>
          <p className="subtitle">좋은 싸움이 되었길 바랄게요.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="display-flex">
              <FormInput
                name="date"
                title="언제 싸웠나요?"
                register={register}
                type="date"
                defaultValue={date}
                style={{ marginRight: "1rem" }}
              />
              <FormSelect
                register={register}
                name="solved"
                title="해결 했나요?"
                defaultValue={solved}
                options={[
                  { value: "unsolved", text: "해결 안했어요" },
                  { value: "solved", text: "해결했어요" },
                  { value: "willSolve", text: "나중에 해결할 거예요" },
                ]}
              />
            </div>
            <div className="display-flex">
              <FormInput
                name="target"
                title="누가 잘못했나요?"
                register={register}
                defaultValue={target}
                style={{ marginRight: "1rem" }}
              />
              <FormInput
                name="keyword"
                title="키워드"
                register={register}
                defaultValue={keyword}
              />
            </div>
            <FormInput
              name="content"
              title="무슨 일로 싸웠나요?"
              register={register}
              defaultValue={content}
            />
            <FormInput
              name="reason"
              title="왜 싸웠나요?"
              register={register}
              defaultValue={reason}
            />
            <FormInput
              name="feedback"
              title="어떻게 해결하고 싶나요?"
              register={register}
              defaultValue={feedback}
            />
            <Button
              type="submit"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              저장하기
            </Button>
          </form>
        </Container>
      )}
      <style jsx>{`
        .display-flex {
          display: flex;
        }
        .title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.6rem;
        }
        .subtitle {
          margin-bottom: 3rem;
        }
      `}</style>
    </>
  );
};

export default MyFightsUpdateForm;
