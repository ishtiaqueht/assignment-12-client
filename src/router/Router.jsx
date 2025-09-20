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
import BeATutor from "../pages/dashBoard/BeATutor";
import ApproveTutors from "../pages/dashBoard/ApproveTutors";
import CreateStudySession from "../pages/dashBoard/CreateStudySession";
import MySessions from "../pages/dashBoard/MySessions";
import ManageSessions from "../pages/dashBoard/ManageSessions";
import UploadMaterials from "../pages/dashBoard/UploadMeterials";
import MyMaterials from "../pages/dashBoard/MyMeterials";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "tutors", element: <Tutors /> },
      { path: "studySessions", element: <StudySessions /> },
      { 
        path: "sessions/:id", 
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        )
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
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
      { path: "be-a-tutor", element: <BeATutor /> },

      // Tutor
      { path: "create-session", element: <CreateStudySession></CreateStudySession> },
      { path: "my-sessions", element: <MySessions></MySessions> },
      { path: "upload-materials", element: <UploadMaterials></UploadMaterials> },
      { path: "my-materials", element: <MyMaterials></MyMaterials> },

      // Admin
      { path:"manageUsers", element: <MakeRole /> },
      { path: "approve-tutors", element: <ApproveTutors /> },
      { path: "all-sessions", element: <ManageSessions></ManageSessions> },
      { path: "all-materials", element: <div>Manage Materials Page</div> },
    ],
  },
]);
