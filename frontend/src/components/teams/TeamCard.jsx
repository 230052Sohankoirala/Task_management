import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { AvatarGroup } from "../common/Avatar";

export function TeamCard({ team }) {
  const { users } = useContext(UserContext);
  const leader = users.find((user) => user.id === team.leaderId);
  const members = users.filter((user) => (team.memberIds || []).includes(user.id));

  return <article className="card team-card"><Link to={`/teams/${team.id}`}><h3>{team.name}</h3></Link><p>{team.description}</p><span>Leader: {leader?.name || "Unassigned"}</span><AvatarGroup users={members} /><footer>{(team.memberIds || []).length} members - {(team.projectIds || []).length} projects</footer></article>;
}
