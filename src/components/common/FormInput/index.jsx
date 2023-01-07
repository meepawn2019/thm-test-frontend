import React, { Fragment } from "react";

const FormInput = ({
  label,
  name,
  value,
  handleChange,
  errors,
  touched,
  className,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-left font-bold text-black mt-4">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        className={`border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
      ${errors && touched ? "border-rose-700" : "border-gray-300"}
    `}
      />
      {errors && touched && (
        <div className="text-rose-700 text-left">{errors}</div>
      )}
    </div>
  );
};

export default FormInput;
