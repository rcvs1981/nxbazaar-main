// components/FormInputs/ToggleInput.tsx
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface ToggleInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  trueTitle: string;
  falseTitle: string;
  register: UseFormRegister<T>;
  className?: string;
  disabled?: boolean;
}

export default function ToggleInput<T extends FieldValues>({
  label,
  name,
  trueTitle,
  falseTitle,
  register,
  className = "",
  disabled = false,
}: ToggleInputProps<T>) {
  return (
    <div className={`flex items-center ${className}`}>
      <label className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          disabled={disabled}
          {...register(name)}
        />
        <div className={`w-11 h-6 bg-gray-200 rounded-full peer 
          peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
          dark:peer-focus:ring-blue-800 dark:bg-gray-700 
          peer-checked:after:translate-x-full peer-checked:after:border-white 
          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
          after:bg-white after:border-gray-300 after:border after:rounded-full 
          after:h-5 after:w-5 after:transition-all dark:border-gray-600 
          peer-checked:bg-blue-600 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {trueTitle} / {falseTitle}
        </span>
      </label>
    </div>
  );
}