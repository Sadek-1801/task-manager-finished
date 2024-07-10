import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Register/Login";
import PrivateRouts from "./PrivateRouts";
import Main from "../pages/Main/Main";
import Home from "../pages/Home/Home";
import AddTasks from "../pages/Admin/AddTasks/AddTasks";
import ManageTasks from "../pages/Admin/ManageTasks/ManageTasks";
import MyTasks from "../pages/user/MyTasks";
import BoardComponent from "../pages/user/BoardComponent";
import Register from "../pages/Register/Register";
import ErrorElement from "../pages/ErrorElem/ErrorElement"
import Profile from "../pages/Shared/Profile";
import AdminRouts from "./AdminRouts";
import Users from "../pages/Admin/ManageTasks/Users/Users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: "/main",
    element: <PrivateRouts><Main /></PrivateRouts>,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <PrivateRouts><Profile /></PrivateRouts>
      },
      {
        path: "add-tasks",
        element: <AdminRouts><AddTasks /></AdminRouts>
      },
      {
        path: "manage-tasks",
        element: <AdminRouts><ManageTasks /></AdminRouts>
      },
      {
        path: "users",
        element: <AdminRouts><Users /></AdminRouts>
      },
      {
        path: "my-tasks",
        element: <PrivateRouts><MyTasks /></PrivateRouts>
      },
      {
        path: "board",
        element: <PrivateRouts><BoardComponent /></PrivateRouts>
      },
    ]
  },
  
]);