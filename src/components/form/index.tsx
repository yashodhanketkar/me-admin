import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type FormFieldFactoryType = {
  name: string;
  errors: FieldErrors<FieldValues>;
  fieldType: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  valueAsNumber: boolean;
  labelclass?: string;
  textclass?: string;
};

const FormFieldFactory = ({
  name,
  errors,
  fieldType,
  register,
  required,
  valueAsNumber = false,
  labelclass,
  textclass,
}: FormFieldFactoryType) => {
  const [hide, setHide] = useState(true);

  return (
    <div className="flex flex-col w-11/12 gap-1">
      <label htmlFor={name} className={labelclass && labelclass}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      {fieldType === "textarea" ? (
        <textarea
          className="p-2 text-white rounded-md outline-none resize-none bg-neutral-900"
          placeholder={name}
          rows={5}
          {...register(name, { required })}
        />
      ) : fieldType === "password" ? (
        <div>
          <input
            className={`p-2 text-white w-full rounded-md outline-none bg-neutral-900 ${
              textclass && textclass
            }`}
            type={hide ? fieldType : "text"}
            placeholder={name}
            {...register(name, { required, valueAsNumber })}
          />
          <button
            className="absolute text-red-500 hover:text-red-400 right-3 top-4"
            type="button"
            onClick={() => setHide((prev) => !prev)}
          >
            {hide ? (
              <AiOutlineEyeInvisible size={24} />
            ) : (
              <AiOutlineEye size={24} />
            )}
          </button>
        </div>
      ) : (
        <input
          className={`p-2 text-white rounded-md outline-none bg-neutral-900 ${
            textclass && textclass
          }`}
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
