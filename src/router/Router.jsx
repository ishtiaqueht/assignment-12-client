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
import ManageMaterials from "../pages/dashBoard/ManageMaterials";
import ViewBookedSession from "../pages/dashBoard/ViewBookedSession";
import ViewStudyMaterials from "../pages/dashBoard/ViewStudyMaterials";
import CreateNote from "../pages/dashBoard/CreateNote";
import ManagePersonalNotes from "../pages/dashBoard/ManagePersonalNotes";
import AdminRoute from "../routes/AdminRoute";
import Forbidden from "../pages/forbidden/Forbidden";
import TutorRoute from "../routes/TutorRoute";
import PaymentPage from "../pages/payment/PaymentPage";
import DashboardHome from "../pages/dashBoard/DashboardHome/DashboardHome";

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
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/forbidden",
        element: <Forbidden></Forbidden>,
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
      {
        index: true,
        Component: DashboardHome
      },
      // Student
      {
        path: "booked-sessions",
        element: <ViewBookedSession></ViewBookedSession>,
      },
      { path: "create-note", element: <CreateNote></CreateNote> },
      {
        path: "manage-notes",
        element: <ManagePersonalNotes></ManagePersonalNotes>,
      },
      {
        path: "study-materials",
        element: <ViewStudyMaterials></ViewStudyMaterials>,
      },
      { path: "be-a-tutor", element: <BeATutor /> },

      // Tutor
      {
        path: "create-session",
        element: (
          <TutorRoute>
            <CreateStudySession></CreateStudySession>
          </TutorRoute>
        ),
      },
      {
        path: "my-sessions",
        element: (
          <TutorRoute>
            <MySessions></MySessions>
          </TutorRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <TutorRoute>
            <UploadMaterials></UploadMaterials>
          </TutorRoute>
        ),
      },
      {
        path: "my-materials",
        element: (
          <TutorRoute>
            <MyMaterials></MyMaterials>
          </TutorRoute>
        ),
      },

      // Admin
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <MakeRole />
          </AdminRoute>
        ),
      },
      {
        path: "approve-tutors",
        element: (
          <AdminRoute>
            <ApproveTutors />
          </AdminRoute>
        ),
      },
      {
        path: "all-sessions",
        element: (
          <AdminRoute>
            <ManageSessions></ManageSessions>
          </AdminRoute>
        ),
      },
      {
        path: "all-materials",
        element: (
          <AdminRoute>
            <ManageMaterials></ManageMaterials>
          </AdminRoute>
        ),
      },
    ],
  },
]);
