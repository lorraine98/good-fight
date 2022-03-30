import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  name: string;
  title: string;
  options: option[];
}

interface option {
  value: string;
  text: string;
}

const FormSelect = ({ register, name, title, options }: Props) => {
  return (
    <>
      <div className="question-wrapper">
        <label htmlFor={name}>{title}</label>
        <select {...register(name, { required: true })}>
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
          font-size: 1rem;
          font-family: inherit;
        }
      `}</style>
    </>
  );
};

export default FormSelect;