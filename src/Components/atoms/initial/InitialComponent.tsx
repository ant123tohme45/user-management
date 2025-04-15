import React from "react";
import { InitialProps } from "./Initial.types";

const Initial: React.FC<InitialProps> = ({ text }) => (
  <div className="init-container">
    <h1 className="card-init">{text}</h1>
  </div>
);

export default Initial;
