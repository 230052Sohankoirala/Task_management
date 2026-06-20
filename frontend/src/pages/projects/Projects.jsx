import { useContext, useState } from "react";
import { Plus } from "lucide-react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { PageHeader } from "../../components/layout/PageHeader";
import { ProjectCard } from "../../components/projects/ProjectCard";
import { ProjectForm } from "../../components/projects/ProjectForm";

export default function Projects() {
  const { projects } = useContext(ProjectContext);
  const [open, setOpen] = useState(false);
  return <><PageHeader title="Projects" description="Track initiatives, owners, progress, and risk." action={<Button icon={Plus} onClick={() => setOpen(true)}>New project</Button>} /><div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div><Modal open={open} title="Create project" onClose={() => setOpen(false)}><ProjectForm onSaved={() => setOpen(false)} /></Modal></>;
}
