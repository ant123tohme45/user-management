import { CardsContainerProps } from "./CardsContainertypes";

const CardContainer = ({ children }: CardsContainerProps) => {
  return <div className="card-sec">{children}</div>;
};

export default CardContainer;
