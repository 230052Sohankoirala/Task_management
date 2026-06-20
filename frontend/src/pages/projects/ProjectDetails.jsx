import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TaskContext } from "../../contexts/TaskContext";
import { EmptyState } from "../../components/common/State";
import { ProjectHeader } from "../../components/projects/ProjectHeader";
import { ProjectMemberList } from "../../components/projects/ProjectMemberList";
import { ProjectProgress } from "../../components/projects/ProjectProgress";
import { ProjectTabs } from "../../components/projects/ProjectTabs";
import { TaskTable } from "../../components/tasks/TaskTable";
import { KanbanBoard } from "../../components/board/KanbanBoard";
import Backlog from "../tasks/Backlog";

export default function ProjectDetails() {
  const { id } = useParams();
  const { projects } = useContext(ProjectContext);
  const { tasks } = useContext(TaskContext);
  const [active, setActive] = useState("Overview");
  const project = projects.find((item) => item.id === id);
  if (!project) return <EmptyState title="Project not found" />;
  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  return <><ProjectHeader project={project} /><ProjectTabs active={active} onChange={setActive} />{active === "Overview" && <div className="two-col"><ProjectProgress project={project} /><ProjectMemberList project={project} /></div>}{active === "Board" && <KanbanBoard />}{active === "Backlog" && <Backlog embedded />}{active === "Tasks" && <TaskTable tasks={projectTasks} />}{active === "Members" && <ProjectMemberList project={project} />}{active === "Activity" && <p className="card">Project activity stream is ready for backend events.</p>}{active === "Settings" && <p className="card">Project settings can be changed by managers.</p>}</>;
}
