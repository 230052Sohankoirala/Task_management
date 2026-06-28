import { useContext } from "react";
import { BarChart3, FolderKanban, Shield, Users } from "lucide-react";
import { StatCard } from "../../components/common/StatCard";
import { PageHeader } from "../../components/layout/PageHeader";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TaskContext } from "../../contexts/TaskContext";
import { UserContext } from "../../contexts/UserContext";

export default function AdminDashboard() {
  const { tasks } = useContext(TaskContext);
  const { projects } = useContext(ProjectContext);
  const { users } = useContext(UserContext);
  const activeProjects = projects.filter((project) => project.status !== "Archived").length;

  return <><PageHeader title="Admin Dashboard" description="System-level controls and operational health." /><div className="stats-grid"><StatCard icon={Users} label="Users" value={users.length} /><StatCard icon={FolderKanban} label="Active projects" value={activeProjects} tone="purple" /><StatCard icon={BarChart3} label="Tasks" value={tasks.length} tone="green" /><StatCard icon={Shield} label="Roles" value={3} tone="orange" /></div></>;
}
