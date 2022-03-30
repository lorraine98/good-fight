import { SubmitHandler, useForm } from "react-hook-form";
import Container from "../../shared/components/container/index";
import Button from "../../shared/components/button/index";
import { myFightsProps, postMyFightsForm } from "../../api/post-my-fights-form";
import { useRouter } from "next/router";

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
            <div className="question-wrapper PR-1">
              <label htmlFor="date">언제 싸웠나요?</label>
              <input type="date" {...register("date", { required: true })} />
            </div>
            <div className="question-wrapper">
              <label htmlFor="solved">해결 했나요?</label>
              <select {...register("solved", { required: true })}>
                <option value="unsolved">해결 안했어요</option>
                <option value="solved">해결했어요</option>
                <option value="willSolve">나중에 해결할 거예요</option>
              </select>
            </div>
          </div>
          <div className="display-flex">
            <div className="question-wrapper PR-1">
              <label htmlFor="target">누가 잘못했나요?</label>
              <input type="text" {...register("target", { required: true })} />
            </div>
            <div className="question-wrapper">
              <label htmlFor="keyword">키워드</label>
              <input type="text" {...register("keyword", { required: true })} />
            </div>
          </div>
          <div className="question-wrapper">
            <label htmlFor="content">무슨 일로 싸웠나요?</label>
            <input type="text" {...register("content", { required: true })} />
          </div>
          <div className="question-wrapper">
            <label htmlFor="reason">왜 싸웠나요?</label>
            <input type="text" {...register("reason", { required: true })} />
          </div>
          <div className="question-wrapper">
            <label htmlFor="feedback">어떻게 해결하고 싶나요?</label>
            <input type="text" {...register("feedback", { required: true })} />
          </div>
          <Button type="submit" style={{ marginTop: "1rem" }}>
            저장하기
          </Button>
        </form>
      </Container>
      <style jsx>{`
        .display-flex {
          display: flex;
        }
        .question-wrapper {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
          width: 100%;
        }
        .question-wrapper label {
          margin-bottom: 0.8rem;
          font-weight: 600;
        }
        .title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.6rem;
        }
        .subtitle {
          margin-bottom: 3rem;
        }
        input {
          border-radius: 0.375rem;
          padding: 0.7rem auto;
          height: 2.5rem;
        }
        select {
          border-radius: 0.375rem;
          padding: 0.7rem 0.3rem;
          height: 2.5rem;
        }
        .PR-1 {
          padding-right: 1rem;
        }
      `}</style>
    </>
  );
};
export default MyFightsAddForm;
