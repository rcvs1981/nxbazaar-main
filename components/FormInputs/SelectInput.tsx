"use client";
import type { Option } from "@/types/Option";
import {
  FieldErrors,
  Path,
  UseFormRegister,
  FieldError,
} from "react-hook-form";

interface SelectInputProps<T extends Record<string, unknown>> {
  label: string;
  name: Path<T>;
  options: Option[];
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  className?: string; // ✅ className को props में ऐड किया
}

function SelectInput<T extends Record<string, unknown>>({
  label,
  name,
  options,
  register,
  errors,
  className, // ✅ destructure किया
}: SelectInputProps<T>) {
  const error = errors?.[name] as FieldError | undefined;

  return (
    <div className={`w-full ${className ?? ""}`}> {/* ✅ className को यूज़ किया */}
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        {...register(name)}
        className={`bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-600 mt-1">{String(error.message)}</p>
      )}
    </div>
  );
}

export default SelectInput;
