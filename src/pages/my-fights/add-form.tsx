import { SubmitHandler, useForm } from "react-hook-form";
import Container from "src/shared/components/container/index";
import Button from "src/shared/components/button/index";
import { myFightsProps, postMyFightsForm } from "src/api/post-my-fights-form";
import { useRouter } from "next/router";
import FormInput from "src/shared/components/form-input";
import FormSelect from "src/shared/form-select";

const MyFightsAddForm = () => {
  const { register, handleSubmit } = useForm<myFightsProps>();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<myFightsProps> = (data) => {
    postMyFightsForm(data).then(() => push("/my-fights"));
  };

  return (
    <>
      <Container>
        <p className="title">싸움을 기록해요.</p>
        <p className="subtitle">한 쪽이 억울하지 않도록 함께 적어봐요.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="display-flex">
            <FormInput
              name="date"
              title="언제 싸웠나요?"
              register={register}
              type="date"
              style={{ marginRight: "1rem" }}
            />
            <FormSelect
              register={register}
              name="solved"
              title="해결 했나요?"
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
              placeholder="애칭 또는 이름."
              register={register}
              style={{ marginRight: "1rem" }}
            />
            <FormInput
              name="keyword"
              title="키워드"
              placeholder="한 단어로 요약."
              register={register}
            />
          </div>
          <FormInput
            name="content"
            title="무슨 일로 싸웠나요?"
            placeholder="예) 00이가 지각했음."
            register={register}
          />
          <FormInput
            name="reason"
            title="왜 싸웠나요?"
            placeholder="예) 연락도 없이 늦어서 짜증이 남."
            register={register}
          />
          <FormInput
            name="feedback"
            title="어떻게 해결하고 싶나요?"
            placeholder="예) 늦더라도 연락은 미리주자."
            register={register}
          />
          <Button
            type="submit"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            저장하기
          </Button>
        </form>
      </Container>
      <style jsx>{`
        .display-flex {
          display: flex;
        }
        .title {
          font-size: 1.2rem;
          font-weight: 600;
          padding-top: 5rem;
          margin-bottom: 0.6rem;
        }
        .subtitle {
          margin-bottom: 3rem;
        }
      `}</style>
    </>
  );
};

export default MyFightsAddForm;
