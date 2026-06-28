import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Avatar } from "../common/Avatar";

export function ProjectMemberList({ project }) {
  const { users } = useContext(UserContext);
  const members = users.filter((user) => (project.memberIds || []).includes(user.id));

  return <section className="member-list">{members.map((user) => <article key={user.id}><Avatar name={user.name} /><div><strong>{user.name}</strong><span>{user.jobTitle}</span></div></article>)}</section>;
}
