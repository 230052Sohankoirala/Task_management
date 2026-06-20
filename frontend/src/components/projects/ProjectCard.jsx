import { Link } from "react-router-dom";
import { users } from "../../data/users";
import { formatDate } from "../../utils/formatters";
import { AvatarGroup } from "../common/Avatar";
import { Badge } from "../common/Badge";
import { ProgressBar } from "../common/ProgressBar";

export function ProjectCard({ project }) {
  const members = users.filter((user) => project.memberIds.includes(user.id));
  const lead = users.find((user) => user.id === project.leadId);
  return (
    <article className="project-card" style={{ "--accent": project.color }}>
      <header><span>{project.key}</span><Badge tone="blue">{project.status}</Badge></header>
      <Link to={`/projects/${project.id}`}><h3>{project.name}</h3></Link>
      <p>{project.description}</p>
      <dl>
        <div><dt>Lead</dt><dd>{lead?.name}</dd></div>
        <div><dt>Due</dt><dd>{formatDate(project.dueDate)}</dd></div>
      </dl>
      <ProgressBar value={project.progress} />
      <footer><AvatarGroup users={members} /><strong>{project.progress}%</strong></footer>
    </article>
  );
}
