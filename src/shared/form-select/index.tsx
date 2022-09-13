import { FieldValue, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValue<FieldValues>>;
  name: string;
  title: string;
  options: option[];
  defaultValue?: string;
}

interface option {
  value: string;
  text: string;
}

const FormSelect = ({
  register,
  name,
  title,
  options,
  defaultValue,
}: Props) => {
  return (
    <>
      <div className="question-wrapper">
        <label htmlFor={name}>{title}</label>
        <select
          {...register(name, { required: true })}
          defaultValue={defaultValue}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
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
        select {
          border-radius: 0.375rem;
          padding: 0.7rem 0.3rem;
          height: 3rem;
          font-family: initial;
        }
      `}</style>
    </>
  );
};

export default FormSelect;
