import { useForm } from "react-hook-form";
import Container from "./../../shared/components/container/index";
import Button from "./../../shared/components/button/index";

const MyFightsAdd = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="form-wrapper">
        <p className="title">싸움을 기록해요.</p>
        <p className="subtitle">한 쪽이 억울하지 않도록 함께 적어봐요.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="question-wrapper">
            <label htmlFor="date">언제 싸웠나요?</label>
            <input type="date" {...register("date", { required: true })} />
          </div>
          <div className="question-wrapper">
            <label htmlFor="keyword">키워드</label>
            <input type="text" {...register("keyword", { required: true })} />
          </div>
          <div className="question-wrapper">
            <label htmlFor="target">누가 잘못했나요?</label>
            <input type="text" {...register("target", { required: true })} />
          </div>
          <div className="question-wrapper">
            <label htmlFor="status">해결 했나요?</label>
            <select {...register("status", { required: true })}>
              <option value="unsolved">해결 안했어요</option>
              <option value="solved">해결했어요</option>
              <option value="willSolve">나중에 해결할게요</option>
            </select>
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
          <Button type="submit">저장하기</Button>
        </form>
      </div>
      <style jsx>{`
        .form-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .question-wrapper {
          display: flex;
          flex-direction: column;
        }
        .title {
          font-size: 1rem;
          font-weight: 600;
        }
        input {
          border: none;
          border-radius: 0.375rem;
          height: 2.625rem;
        }
      `}</style>
    </Container>
  );
};
export default MyFightsAdd;
