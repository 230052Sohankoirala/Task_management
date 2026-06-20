import { BarChart3, FolderKanban, Shield, Users } from "lucide-react";
import { StatCard } from "../../components/common/StatCard";
import { PageHeader } from "../../components/layout/PageHeader";
import { projects } from "../../data/projects";
import { tasks } from "../../data/tasks";
import { users } from "../../data/users";

export default function AdminDashboard() {
  return <><PageHeader title="Admin Dashboard" description="System-level controls and operational health." /><div className="stats-grid"><StatCard icon={Users} label="Users" value={users.length} /><StatCard icon={FolderKanban} label="Projects" value={projects.length} tone="purple" /><StatCard icon={BarChart3} label="Tasks" value={tasks.length} tone="green" /><StatCard icon={Shield} label="Roles" value={3} tone="orange" /></div></>;
}
