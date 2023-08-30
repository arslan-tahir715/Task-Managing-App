import React, { useEffect, useState, useMemo } from "react";
import { Box, Button, Card, CardContent, Checkbox, Typography, styled } from "@mui/material";
import { ListType } from "./listTasks";

export type TaskType = string | null;

const BulkDelete = () => {
  const [taskList, setTaskList] = useState<ListType>({});
  const [removeTasks, setRemoveTasks] = useState<string[]>([]);

  useEffect(() => {
    const list: TaskType = localStorage.getItem("taskList");
    if (list) {
      setTaskList(JSON.parse(list));
    }
  }, []);

  const filterTaskList = (tasks: ListType, tasksToRemove: string[]): ListType => {
    return Object.fromEntries(
      Object.entries(tasks).filter(([key]) => !tasksToRemove.includes(key))
    );
  };

  const handleDeleteTasks = () => {
    if (Object.keys(taskList).length) {
      const filteredTasks: ListType = filterTaskList(taskList, removeTasks);
      localStorage.setItem("taskList", JSON.stringify(filteredTasks));
      setTaskList(filteredTasks);
      setRemoveTasks([]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    setRemoveTasks((prevList: string[]) => {
      if (isChecked && !prevList.includes(value)) {
        return [...prevList, value];
      }
      if (!isChecked) {
        return prevList.filter((item: string) => item !== value);
      }
      return prevList;
    });
  };

  const taskListLength = useMemo(() => Object.keys(taskList).length, [taskList]);

  return (
    <Container>
      <TaskListTitle>Select Tasks to Delete</TaskListTitle>
      <CardList>
        {Object.keys(taskList).map((item: string) => (
          <TaskCard key={item} variant="outlined">
            <Checkbox
              checked={removeTasks.includes(item)}
              color="success"
              onChange={handleChange}
              value={item}
            />
            <CardContent>
              <TaskTitle variant="h5">{taskList[item]}</TaskTitle>
            </CardContent>
          </TaskCard>
        ))}
        {taskListLength === 0 && <NoListText>No List Found</NoListText>}
        <DeleteButton fullWidth onClick={handleDeleteTasks} variant="contained" disabled={!removeTasks.length}>
          Delete
        </DeleteButton>
      </CardList>
    </Container>
  );
};

const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#f7f7f7",
}));

const TaskListTitle = styled(Typography)(() => ({
  fontSize: "32px",
  paddingBottom: "15px",
  fontWeight: "bold",
  color: "#2980b9",
}));

const CardList = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "600px",
}));

const TaskCard = styled(Card)(() => ({
  display: "flex",
  marginBottom: "15px",
  width: "100%",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
}));

const TaskTitle = styled(Typography)(() => ({
  fontWeight: "bold",
  fontSize: "20px",
  marginBottom: "8px",
  color: "#333333",
}));

const NoListText = styled(Typography)(() => ({
  marginTop: "10px",
  color: "#888888",
}));

const DeleteButton = styled(Button)(() => ({
  backgroundColor: "#e74c3c",
  color: "white",
  marginTop: "15px",
  "&:hover": {
    backgroundColor: "#c0392b",
  },
}));

export default BulkDelete;
