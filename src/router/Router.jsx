import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import Tutors from "../pages/tutors/Tutors";
import StudySessions from "../pages/studySessions.jsx/StudySessions";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import SessionDetails from "../pages/studySessions.jsx/SessionDetails";
import PrivateRoute from "../routes/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "tutors",
        Component: Tutors,
      },
      {
        path: "studySessions",
        Component: StudySessions,
      },
      {
        path: "/sessions/:id",
        element: (
          <PrivateRoute>
            <SessionDetails></SessionDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
