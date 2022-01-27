import React from "react";

interface IProps {
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  children: React.ReactNode;
}

const Alert: React.FC<IProps> = ({ children, color = "primary" }) => {
  return (
    <div className={"alert alert-" + color} role="alert">
      {children}
    </div>
  );
};

export { Alert };
