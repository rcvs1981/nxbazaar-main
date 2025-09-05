"use client";

import React from "react";
import {UseFormRegister, FieldErrors, FieldValues, Path  } from "react-hook-form";

type BaseOption = {
  id: string;
  name?: string;
  title?: string;
  [key: string]: any;
};

type SelectInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  className?: string;
  options?: BaseOption[]; // ✅ make it optional
  multiple?: boolean;
};

export default function SelectInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  className = "sm:col-span-2",
  options = [],
  multiple = false,
}: SelectInputProps<T>) {
  const safeOptions = Array.isArray(options) ? options : []; // ✅ safety

  const errorMessage = errors?.[name]?.message as string | undefined;

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
          multiple={multiple}
          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset sm:max-w-xs sm:text-sm sm:leading-6
            ${errorMessage ? "ring-red-500" : "ring-gray-300 focus:ring-indigo-600"}
          `}
        >
          {safeOptions.length > 0 ? (
            safeOptions.map((option, i) => (
              <option key={i} value={option.id}>
                {option.title ?? option.name}
              </option>
            ))
          ) : (
            <option disabled>No options available</option>
          )}
        </select>
      </div>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
