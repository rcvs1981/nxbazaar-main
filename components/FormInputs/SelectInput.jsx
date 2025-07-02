"use client";
import React from "react";

/**
 * @typedef {Object} SelectOption
 * @property {string|number} id
 * @property {string} title
 */

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.name
 * @param {Function} props.register
 * @param {string} [props.className="sm:col-span-2"]
 * @param {SelectOption[]} [props.options=[]]
 * @param {boolean} [props.multiple=false]
 * @param {boolean} [props.required=false]
 * @param {Object} [props.errors={}]
 * @param {boolean} [props.disabled=false]
 */
export default function SelectInput({
  label,
  name,
  register,
  className = "sm:col-span-2",
  options = [],
  multiple = false,
  required = false,
  errors = {},
  disabled = false,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-2">
        <select
          {...register(name, { required })}
          id={name}
          multiple={multiple}
          disabled={disabled}
          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 ${
            disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""
          }`}
          aria-invalid={errors[name] ? "true" : "false"}
        >
          {!required && <option value="">Select an option</option>}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
        {errors[name] && (
          <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
            {errors[name].message || `${label} is required`}
          </p>
        )}
      </div>
    </div>
  );
}