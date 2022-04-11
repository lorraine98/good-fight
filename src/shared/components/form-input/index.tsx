import { CSSProperties } from "react";
import { FieldValue, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValue<FieldValues>>;
  name: string;
  title?: string;
  type?: string;
  placeholder?: string;
  height?: string;
  isTextarea?: boolean;
  style?: CSSProperties;
  defaultValue?: string;
}
const FormInput = ({
  register,
  name,
  title,
  type = "text",
  placeholder,
  height = "3rem",
  isTextarea,
  style,
  defaultValue,
}: Props) => {
  return (
    <>
      <div className="question-wrapper" style={{ ...style }}>
        {title && <label htmlFor={name}>{title}</label>}
        {isTextarea ? (
          <textarea
            placeholder={placeholder}
            {...register(name, { required: true })}
          />
        ) : (
          <input
            defaultValue={defaultValue}
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
          height: ${height};
          font-family: initial;
        }
        textarea {
          padding: 0.7rem;
        }
        input {
          padding-left: 0.7rem;
        }
      `}</style>
    </>
  );
};

export default FormInput;
