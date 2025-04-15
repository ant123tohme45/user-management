import { Initial } from "../../atoms/initial/Initial";
import { CardProps } from "./Card.types";

export const Card = ({
  initial,
  name,
  email,
  status,
  date_of_birth,
}: CardProps) => {
  return (
    <div className="card-container">
      <Initial text={initial} />
      <h1 className="card-username">{name}</h1>
      <p className="card-info">Email: {email}</p>
      <p className="card-info">Status: {status}</p>
      <p className="card-info">Date Of Birth: {date_of_birth}</p>
      <div className="buttons-cont">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
};
