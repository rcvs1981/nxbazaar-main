import React from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

interface SelectOption {
  id: string;
  title: string;
}

interface SelectInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options?: SelectOption[];
  multiple?: boolean;
  className?: string;
  errors?: FieldErrors<T>;
}

export default function SelectInput<T extends FieldValues>({
  label,
  name,
  register,
  options = [],
  multiple = false,
  className = "",
  errors,
}: SelectInputProps<T>) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          {...register(name)}
          id={name}
          name={name}
          multiple={multiple}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      </div>

      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-600">
          {(errors[name]?.message as string) ?? "This field is required"}
        </p>
      )}
    </div>
  );
}
