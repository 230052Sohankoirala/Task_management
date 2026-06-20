import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import { ProtectedRoute, PublicRoute, RoleRoute } from "./components/layout/RouteGuards";
import { ROLES } from "./utils/constants";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Unauthorized from "./pages/auth/Unauthorized";
import NotFound from "./pages/auth/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import MyWork from "./pages/tasks/MyWork";
import Projects from "./pages/projects/Projects";
import ProjectDetails from "./pages/projects/ProjectDetails";
import KanbanPage from "./pages/tasks/KanbanPage";
import Backlog from "./pages/tasks/Backlog";
import TaskDetails from "./pages/tasks/TaskDetails";
import CreateTask from "./pages/tasks/CreateTask";
import EditTask from "./pages/tasks/EditTask";
import Teams from "./pages/teams/Teams";
import TeamDetails from "./pages/teams/TeamDetails";
import Members from "./pages/teams/Members";
import Calendar from "./pages/calendar/Calendar";
import Notifications from "./pages/notifications/Notifications";
import Reports from "./pages/reports/Reports";
import ActivityLog from "./pages/activity/ActivityLog";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import WorkspaceSettings from "./pages/settings/WorkspaceSettings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import ProjectManagement from "./pages/admin/ProjectManagement";
import Analytics from "./pages/admin/Analytics";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="my-work" element={<MyWork />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="board" element={<KanbanPage />} />
          <Route path="backlog" element={<Backlog />} />
          <Route path="tasks/create" element={<CreateTask />} />
          <Route path="tasks/:id" element={<TaskDetails />} />
          <Route path="tasks/:id/edit" element={<EditTask />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:id" element={<TeamDetails />} />
          <Route path="members" element={<Members />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="reports" element={<Reports />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route element={<RoleRoute roles={[ROLES.ADMIN]} />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/users" element={<UserManagement />} />
            <Route path="admin/projects" element={<ProjectManagement />} />
            <Route path="workspace-settings" element={<WorkspaceSettings />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
