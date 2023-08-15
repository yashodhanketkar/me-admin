"use client";

import { FormFieldFactory, FormFieldFactoryType } from "@/components/form";
import { MessageSnackBar, MessageSnackBarType } from "@/components/snackbar";
import { Modal, Snackbar } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createProject } from "./api";

const formFields: Pick<
  FormFieldFactoryType,
  "name" | "fieldType" | "required" | "valueAsNumber"
>[] = [
  {
    name: "title",
    fieldType: "text",
    required: true,
    valueAsNumber: false,
  },
  {
    name: "startYear",
    fieldType: "number",
    required: true,
    valueAsNumber: true,
  },
  {
    name: "endYear",
    fieldType: "number",
    required: false,
    valueAsNumber: true,
  },
  {
    name: "description",
    fieldType: "textarea",
    required: true,
    valueAsNumber: false,
  },
  {
    name: "url",
    fieldType: "text",
    required: true,
    valueAsNumber: false,
  },
];

export const AddProject = () => {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState<MessageSnackBarType>({
    severity: "info",
    message: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let onSubmit = async (data: any) => {
    await createProject(data);
    setMessage({
      severity: "success",
      message: "Added new project",
    });
    openSnackBar();
    handleModal();
  };

  const handleModal = () => {
    setOpen((prev) => !prev);
    reset();
  };

  let openSnackBar = () => {
    setOpenSnack(true);
  };

  let closeSnackBar = () => {
    setMessage({ severity: "info", message: "" });
    setOpenSnack(false);
  };

  return (
    <div className="absolute top-10 right-10">
      <button type="button" className="add-button" onClick={handleModal}>
        Add Project
      </button>
      <Modal open={open} onClose={handleModal}>
        <div className="flex items-center justify-center w-screen h-screen">
          <form
            className="flex items-center w-5/6 transition-all duration-500 ease-in-out form-modal font-comfortaa lg:w-1/2 xl:w-1/3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="text-xl font-bold">Add New Project</label>
            {formFields.map((field) => (
              <FormFieldFactory
                key={field.name}
                name={field.name}
                errors={errors}
                fieldType={field.fieldType}
                register={register}
                required={field.required}
                valueAsNumber={field.valueAsNumber}
              />
            ))}
            <input className="w-1/2 add-button" type="submit" value="submit" />
          </form>
        </div>
      </Modal>
      <MessageSnackBar
        openSnack={openSnack}
        closeSnackBar={closeSnackBar}
        message={message}
      />
    </div>
  );
};
