import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  name: string;
  title: string;
  type?: string;
  placeholder?: string;
  height?: string;
  isTextarea?: boolean;
}
export const FormInput = ({
  register,
  name,
  title,
  type = "text",
  placeholder,
  height = "2.5rem",
  isTextarea,
}: Props) => {
  return (
    <>
      <div className="question-wrapper">
        <label htmlFor={name}>{title}</label>
        {isTextarea ? (
          <textarea
            placeholder={placeholder}
            {...register(name, { required: true })}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            {...register(name, { required: true })}
          />
        )}
      </div>
      <style jsx>{`
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
        input,
        textarea {
          border-radius: 0.375rem;
          padding: 0.7rem;
          height: ${height};
          font-size: 1rem;
          font-family: inherit;
        }
      `}</style>
    </>
  );
};

export default FormInput;
