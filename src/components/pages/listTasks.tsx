import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, styled } from "@mui/material";

export type ListType = Record<string, string>;

const ListTasks = () => {
  const [taskList, setTaskList] = useState<ListType>({});

  useEffect(() => {
    const list: string | null = localStorage.getItem("taskList") || null;
    if (list) {
      setTaskList(JSON.parse(list));
    }
  }, []);

  return (
    <>
      <TaskListTitle>List of Tasks</TaskListTitle>
      <ListWrapper>
        {Object.keys(taskList).length === 0 ? (
          <Typography>No List Found</Typography>
        ) : (
          Object.keys(taskList).map((item: string) => (
            <TaskCard key={item} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {taskList[item]}
                </Typography>
              </CardContent>
            </TaskCard>
          ))
        )}
      </ListWrapper>
    </>
  );
};

const taskListTitleStyle = {
  fontSize: "32px",
  padding: "0 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "100px",
  color: "#2980b9",
};

const TaskCardStyle = {
  marginBottom: "10px",
  backgroundColor: "#ffffff",
  border: "1px solid #dcdcdc",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

const listWrapperStyle = {
  padding: "0 20px",
  justifyContent: "center",
  paddingTop: "20px",
  backgroundColor: "#f9f9f9",
};

const TaskListTitle = styled(Typography)(taskListTitleStyle);
const TaskCard = styled(Card)(TaskCardStyle);
const ListWrapper = styled(Box)(listWrapperStyle);

export default ListTasks;
