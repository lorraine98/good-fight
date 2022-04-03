import { AddCircle, Clear } from "@mui/icons-material";
import { useTheme } from "@mui/system";
import { useRouter } from "next/router";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { postYourFightsForm } from "src/api/post-your-fights-form";
import Button from "src/shared/components/button";
import Container from "src/shared/components/container";
import FormInput from "src/shared/components/form-input";

interface Props {
  content: string;
  defaultOption0: string;
  defaultOption1: string;
  extraOption: option[];
}

interface option {
  name: string;
  value: string;
}

const YourFightsAddForm = () => {
  const { register, handleSubmit, control } = useForm<Props>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "extraOption",
  });

  const theme = useTheme();
  const { push } = useRouter();

  const submitFormData: SubmitHandler<Props> = (data) => {
    const { content, defaultOption0, defaultOption1, extraOption } = data;

    const optionFactory = (value: string) => ({
      optionValue: value,
      votes: 0,
    });

    const optionList = [
      optionFactory(defaultOption0),
      optionFactory(defaultOption1),
      ...extraOption.map((option) => optionFactory(option.value)),
    ];

    const likes = { like: 0, hate: 0 };

    postYourFightsForm({ content, optionList, likes }).then(() =>
      push("/your-fights"),
    );
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
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="extraOption">
                <FormInput
                  name={`extraOption.${index}.value`}
                  register={register}
                  placeholder="추가 선택지예요."
                />
                <Clear
                  onClick={() => remove(index)}
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
          {fields.length < 3 && (
            <button
              className="optionButton"
              onClick={() => append({ name: "" })} //name 필요하지 않아서 빈 값 넣어줌.
            >
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
