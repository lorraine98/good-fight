import { AddCircle, Clear } from "@mui/icons-material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yourFightsProps } from "../../api/post-your-fights-form";
import Button from "../../shared/components/button";
import Container from "../../shared/components/container";
import FormInput from "../../shared/components/form-input";
import { v4 as uuidv4 } from "uuid";

interface IOptionInput {
  uuid: string;
}

const YourFightsAddForm = () => {
  const { register, unregister, handleSubmit } = useForm();
  const theme = useTheme();
  const [optionInputList, setOptionInputList] = useState<IOptionInput[]>([]);

  const submitFormData: SubmitHandler<yourFightsProps> = (data) => {
    console.log(data);
  };

  const addOptionInput = () => {
    const uuid = uuidv4();
    setOptionInputList([...optionInputList, { uuid }]);
  };

  const removeOptionInput = (e: React.MouseEvent<SVGElement>) => {
    const eventTarget = e.target as HTMLElement;
    const inputId =
      eventTarget.closest<HTMLElement>(".extraOption")?.dataset?.id ?? "";
    setOptionInputList(
      optionInputList.filter((optionInput) => optionInput.uuid !== inputId),
    );
    unregister(inputId);
  };

  return (
    <>
      <Container>
        <p className="title">왜 싸웠나요?</p>
        <p className="subtitle">객관적으로 적어야 좋은 판단이 가능해요.</p>
        <form onSubmit={handleSubmit(submitFormData)}>
          <FormInput
            name="content"
            title="내용"
            register={register}
            placeholder="상황, 이유 등을 적어주세요."
            height="15rem"
            isTextarea={true}
          />
          <FormInput
            name="defaultOption0"
            title="선택지"
            register={register}
            placeholder="예) A가 잘못했네!"
          />
          <FormInput
            name="defaultOption1"
            register={register}
            placeholder="예) B가 잘못했네!"
          />
          {optionInputList.map((optionInput) => {
            return (
              <div
                data-id={optionInput.uuid}
                key={optionInput.uuid}
                className="extraOption"
              >
                <FormInput
                  name={optionInput.uuid}
                  register={register}
                  placeholder="추가 선택지예요."
                />
                <Clear
                  onClick={removeOptionInput}
                  sx={{
                    color: theme.palette.gray,
                    position: "absolute",
                    right: 12,
                    top: 12,
                  }}
                />
              </div>
            );
          })}
          {optionInputList.length < 3 && (
            <button className="optionButton" onClick={addOptionInput}>
              <AddCircle sx={{ color: theme.palette.gray }} />
            </button>
          )}
          <Button
            type="submit"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            게시하기
          </Button>
        </form>
      </Container>
      <style jsx>{`
        .title {
          font-size: 1.2rem;
          font-weight: 600;
          padding-top: 5rem;
          margin-bottom: 0.6rem;
        }
        .subtitle {
          margin-bottom: 3rem;
        }
        .optionButton {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-bottom: 2rem;
        }
        .extraOption {
          position: relative;
        }
      `}</style>
    </>
  );
};

export default YourFightsAddForm;
