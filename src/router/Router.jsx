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
import DashboardLayout from "../layouts/DashboardLayout";
import MakeRole from "../pages/dashBoard/MakeRole";

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
   {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Student
      { path: "booked-sessions", element: <div>Booked Sessions Page</div> },
      { path: "create-note", element: <div>Create Note Page</div> },
      { path: "manage-notes", element: <div>Manage Notes Page</div> },
      { path: "study-materials", element: <div>Study Materials Page</div> },

      // Tutor
      { path: "create-session", element: <div>Create Session Page</div> },
      { path: "my-sessions", element: <div>My Sessions Page</div> },
      { path: "upload-materials", element: <div>Upload Materials Page</div> },
      { path: "my-materials", element: <div>My Materials Page</div> },

      // Admin
      { path: "users", element: <MakeRole></MakeRole> },
      { path: "all-sessions", element: <div>Manage Sessions Page</div> },
      { path: "all-materials", element: <div>Manage Materials Page</div> },
    ],
  },
]);
