import { users } from "../../data/users";
import { Avatar } from "../common/Avatar";

export function ProjectMemberList({ project }) {
  return <section className="member-list">{users.filter((user) => project.memberIds.includes(user.id)).map((user) => <article key={user.id}><Avatar name={user.name} /><div><strong>{user.name}</strong><span>{user.jobTitle}</span></div></article>)}</section>;
}
