import { useState } from "react";
import { useNavigate } from "react-router";
import { Initial } from "../../atoms/initial/Initial";
import { CardProps } from "./Card.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import toast from "react-hot-toast";

export const Card = ({
  id,
  initial,
  name,
  email,
  status,
  date_of_birth,
}: CardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteUser = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Refresh list
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || "Delete failed");
    },
  });

  return (
    <>
      <div className="card-container">
        <Initial text={initial} />
        <h1 className="card-username">{name}</h1>
        <p className="card-info">Email: {email}</p>
        <p className="card-info">Status: {status}</p>
        <p className="card-info">Date Of Birth: {date_of_birth}</p>
        <div className="buttons-cont">
          <button
            className="edit-btn"
            onClick={() => navigate(`/dashboard/edit/${id}`)}
          >
            Edit
          </button>
          <button className="delete-btn" onClick={() => setShowConfirm(true)}>
            Delete
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="confirmation-modal">
          <div className="inner-confirmation">
            <p className="modal-header">
              Are you sure you want to delete this user?
            </p>
            <div className="confirmation-btns">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="modal-delete-btn"
                onClick={() => {
                  deleteUser.mutate();
                  setShowConfirm(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
