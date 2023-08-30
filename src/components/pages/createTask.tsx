import { useState } from "react";
import { Box, Button, FormControl, styled, TextField, Typography } from "@mui/material";
import { ListType } from "./listTasks";
import { v4 as uuidv4 } from 'uuid';

const CreateTask = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleFormSubmit = () => {
    const list: ListType = JSON.parse(localStorage.getItem("taskList") || "{}");
    list[uuidv4()] = taskName;
    localStorage.setItem("taskList", JSON.stringify(list));
    // Consider using React Router or similar for navigation
    window.location.href = "/list-tasks";
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskName: string = event.target.value;
    setTaskName(taskName);
    setDisabled(taskName.length === 0);
  };

  return (
    <>
      <FormTitle>Please Enter Task</FormTitle>
      <FormWrapper>
        <FormControl fullWidth variant="outlined">
          <StyledTextField
            name="taskName"
            label="Enter Task Name"
            variant="outlined"
            onChange={handleChange}
            value={taskName}
            required
          />
          <StyledButton onClick={handleFormSubmit} type="submit" variant="contained" disabled={disabled}>
            Submit
          </StyledButton>
        </FormControl>
      </FormWrapper>
    </>
  );
};

const formTitleStyle = {
  fontSize: "32px",
  padding: "0 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "100px",
  color: "#2980b9",
};

const formWrapperStyle = {
  padding: "0 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "20px",
  backgroundColor: "#f9f9f9",
};

const StyledButton = styled(Button)(() => ({
  backgroundColor: "#27ae60",
  color: "white",
  "&:hover": {
    backgroundColor: "#219651",
  }
}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "20px",
  backgroundColor: "#f9f9f9",
}));

const FormTitle = styled(Typography)(formTitleStyle);
const FormWrapper = styled(Box)(formWrapperStyle);

export default CreateTask;
