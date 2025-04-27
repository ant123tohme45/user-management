import { CardsContainerProps } from "./CardsContainer.types";

const CardContainer = ({ children }: CardsContainerProps) => {
  return <div className="card-sec">{children}</div>;
};

export default CardContainer;
