import React, { ChangeEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  placeholderText: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextBox = ({ children, placeholderText, value, onChange }: Props) => {
  return (
    <div className="mb-3">
      <label className="form-label">{children}</label>
      <input
        className="form-control"
        placeholder={placeholderText}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextBox;
