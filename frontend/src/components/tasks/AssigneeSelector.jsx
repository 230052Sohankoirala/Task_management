import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Select } from "../common/Form";

export function AssigneeSelector({ value, onChange }) {
  const { users } = useContext(UserContext);

  return (
    <Select value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">Unassigned</option>
      {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
    </Select>
  );
}
