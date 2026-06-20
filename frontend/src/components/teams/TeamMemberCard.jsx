import { Avatar } from "../common/Avatar";

export function TeamMemberCard({ user }) {
  return <article className="member-card"><Avatar name={user.name} /><div><strong>{user.name}</strong><span>{user.role}</span></div></article>;
}
