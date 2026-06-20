import { initials } from "../../utils/formatters";

export function Avatar({ name, label }) {
  return <span className="avatar" title={label || name}>{initials(name)}</span>;
}

export function AvatarGroup({ users }) {
  return (
    <div className="avatar-group">
      {users.slice(0, 4).map((user) => <Avatar key={user.id} name={user.name} />)}
      {users.length > 4 ? <span className="avatar more">+{users.length - 4}</span> : null}
    </div>
  );
}
