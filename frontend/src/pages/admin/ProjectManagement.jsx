import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Badge } from "../../components/common/Badge";
import { Table } from "../../components/common/Table";
import { PageHeader } from "../../components/layout/PageHeader";

export default function ProjectManagement() {
  const { projects } = useContext(ProjectContext);
  return <><PageHeader title="Project Management" description="All workspace projects and delivery status." /><Table rows={projects} columns={[{ key: "key", label: "Key" }, { key: "name", label: "Name" }, { key: "status", label: "Status", render: (project) => <Badge tone="blue">{project.status}</Badge> }, { key: "priority", label: "Priority" }, { key: "progress", label: "Progress", render: (project) => `${project.progress}%` }]} /></>;
}
