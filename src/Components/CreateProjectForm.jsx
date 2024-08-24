import React from "react";
import CustomFormInput from "./CustomFormInput";

function CreateProjectForm({ handleProjectChange, projectValues }) {
  return (
    <>
      <CustomFormInput
        label="Project Title"
        fullWidth
        value={projectValues.taskTitle.value}
        onChange={(e) => handleProjectChange("projectTitle", e.target.value)}
        error={projectValues.taskTitle.error}
        helperText={projectValues.taskTitle.helperText}
      />

      <CustomFormInput
        label="Project Description"
        fullWidth
        multiline
        rows={2}
        placeholder="Something small about the task"
        customStyles={{ mt: 1.5 }}
        value={projectValues.taskDescription.value}
        onChange={(e) =>
          handleProjectChange("projectDescription", e.target.value)
        }
        error={projectValues.taskDescription.error}
        helperText={projectValues.taskDescription.helperText}
      />
    </>
  );
}

export default CreateProjectForm;
