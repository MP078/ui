import React from "react";
import { FormInputProps } from "./types";

export function FormInput({
  id,
  name,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  required = true,
  icon,
}: FormInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`
            w-full px-4 py-2 ${icon ? "pl-10" : ""}
            border rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange
            ${error ? "border-red-500" : "border-gray-300"}
          `}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
