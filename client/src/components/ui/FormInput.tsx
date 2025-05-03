import React from "react";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = "text",
  required = false,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        className={`
          px-3 py-2 block w-full rounded-md border
          ${
            errors[name]
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }
          shadow-sm placeholder-gray-400
          focus:outline-none focus:ring-2 sm:text-sm
          ${className}
        `}
        aria-invalid={errors[name] ? "true" : "false"}
        {...register(name)}
        {...props}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default FormInput;
