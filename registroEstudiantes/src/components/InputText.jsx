import React from "react";

const InputText = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="mb-3 text-start">
      <label className="form-label fw-bold">{label}</label>
      <input
        type={type}
        className="form-control shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default InputText;