import { createBrowserRouter } from "react-router-dom";
import { ListTasks, CreateTask, BulkDelete } from "./../pages/index";

const routes = [
  { path: "/", element: <ListTasks /> },
  { path: "/list-tasks", element: <ListTasks /> },
  { path: "/create-task", element: <CreateTask /> },
  { path: "/bulk-delete", element: <BulkDelete /> },
];

const AppRoutes = createBrowserRouter(routes);

export default AppRoutes;