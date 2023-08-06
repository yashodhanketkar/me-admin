"use client";
import { deleteProject } from "../api";

export const DeleteButton = ({ id }: { id: string }) => {
  return (
    <button
      onClick={() => {
        deleteProject(id);
      }}
      className="add-button"
    >
      Delete
    </button>
  );
};
