import { users } from "../../data/users";
import { Select } from "../common/Form";

export function MemberSelector({ value, onChange }) {
  return <Select value={value} onChange={(event) => onChange(event.target.value)}>{users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</Select>;
}
