import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "../../components/common/Tabs";
import { EmptyState } from "../../components/common/State";
import { PageHeader } from "../../components/layout/PageHeader";
import { TeamMemberCard } from "../../components/teams/TeamMemberCard";
import { projects } from "../../data/projects";
import { teams } from "../../data/teams";
import { users } from "../../data/users";
import { ProjectCard } from "../../components/projects/ProjectCard";

export default function TeamDetails() {
  const { id } = useParams();
  const [active, setActive] = useState("Overview");
  const team = teams.find((item) => item.id === id);
  if (!team) return <EmptyState title="Team not found" />;
  const members = users.filter((user) => team.memberIds.includes(user.id));
  return <><PageHeader title={team.name} description={team.description} /><Tabs tabs={["Overview", "Members", "Projects", "Activity"]} active={active} onChange={setActive} />{active === "Overview" && <section className="card"><p>{team.memberIds.length} members and {team.projectIds.length} active projects.</p></section>}{active === "Members" && <div className="member-list">{members.map((user) => <TeamMemberCard key={user.id} user={user} />)}</div>}{active === "Projects" && <div className="project-grid">{projects.filter((project) => team.projectIds.includes(project.id)).map((project) => <ProjectCard key={project.id} project={project} />)}</div>}{active === "Activity" && <p className="card">Recent team activity will appear here.</p>}</>;
}
