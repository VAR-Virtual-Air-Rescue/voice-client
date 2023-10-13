import React from "react";

interface Props {
  children: React.ReactNode;
  placeholderText: string;
}

const TextBox = ({ children, placeholderText }: Props) => {
  return (
    <div className="mb-3">
      <label className="form-label">{children}</label>
      <input className="form-control" placeholder={placeholderText} />
    </div>
  );
};

export default TextBox;
