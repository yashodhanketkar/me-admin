import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type FormFieldFactoryType = {
  name: string;
  errors: FieldErrors<FieldValues>;
  fieldType: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  valueAsNumber: boolean;
};

const FormFieldFactory = ({
  name,
  errors,
  fieldType,
  register,
  required,
  valueAsNumber = false,
}: FormFieldFactoryType) => {
  return (
    <div className="flex flex-col w-11/12 gap-1">
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      {fieldType === "textarea" ? (
        <textarea
          className="p-2 text-white rounded-md outline-none resize-none bg-neutral-900"
          placeholder={name}
          rows={5}
          {...register(name, { required })}
        />
      ) : (
        <input
          className="p-2 text-white rounded-md outline-none bg-neutral-900"
          type={fieldType}
          placeholder={name}
          {...register(name, { required, valueAsNumber })}
        />
      )}
      {errors?.[name] && (
        <p className="text-sm text-red-600 transition-all duration-500 ease-in-out drop-shadow-glow">{`*${name} is required!`}</p>
      )}
    </div>
  );
};

export { FormFieldFactory };
