import React from "react";

interface Props {
  children: React.ReactNode;
}

const Button = ({ children }: Props) => {
  return (
    <button type="button" className="btn btn-success">
      {children}
    </button>
  );
};

export default Button;
