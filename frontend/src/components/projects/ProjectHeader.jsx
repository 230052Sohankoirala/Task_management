import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AvatarGroup } from "../common/Avatar";
import { Badge } from "../common/Badge";
import { ProgressBar } from "../common/ProgressBar";

export function ProjectHeader({ project }) {
  const { users } = useContext(UserContext);
  const members = users.filter((user) => (project.memberIds || []).includes(user.id));
  return (
    <section className="project-hero" style={{ "--accent": project.color }}>
      <div><span>{project.key}</span><h1>{project.name}</h1><p>{project.description}</p></div>
      <div><Badge tone="blue">{project.status}</Badge><AvatarGroup users={members} /><ProgressBar value={project.progress || 0} /></div>
    </section>
  );
}
