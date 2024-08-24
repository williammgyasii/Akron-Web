import React from "react";
import CustomFormInput from "./CustomFormInput";

function CreateProjectForm({ handleProjectChange, projectValues }) {
  return (
    <>
      <CustomFormInput
        label="Project Title"
        fullWidth
        value={projectValues.projectTitle.value}
        onChange={(e) => handleProjectChange("projectTitle", e.target.value)}
        error={projectValues.projectTitle.error}
        helperText={projectValues.projectTitle.helperText}
      />

      <CustomFormInput
        label="Project Description"
        fullWidth
        multiline
        rows={2}
        placeholder="Something small about the task"
        customStyles={{ mt: 1.5 }}
        value={projectValues.projectDescription.value}
        onChange={(e) =>
          handleProjectChange("projectDescription", e.target.value)
        }
        error={projectValues.projectDescription.error}
        helperText={projectValues.projectDescription.helperText}
      />
    </>
  );
}

export default CreateProjectForm;
