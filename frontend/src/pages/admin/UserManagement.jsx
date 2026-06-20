import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Table } from "../../components/common/Table";
import { PageHeader } from "../../components/layout/PageHeader";
import { users } from "../../data/users";

export default function UserManagement() {
  return <><PageHeader title="User Management" description="Review members, roles, and departments." action={<Button>Invite user</Button>} /><Table rows={users} columns={[{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "role", label: "Role", render: (user) => <Badge tone="blue">{user.role}</Badge> }, { key: "department", label: "Department" }]} /></>;
}
