import React from "react";

// import { Container } from './styles';

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
}
const Spinner: React.FC<IProps> = ({ color = "primary" }) => {
  return (
    <div className={"spinner-border text-" + color} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export { Spinner };
