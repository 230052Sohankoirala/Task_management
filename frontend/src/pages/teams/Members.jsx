import { PageHeader } from "../../components/layout/PageHeader";
import { Table } from "../../components/common/Table";
import { users } from "../../data/users";

export default function Members() {
  return <><PageHeader title="Members" description="Workspace members and role assignments." /><Table rows={users} columns={[{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "role", label: "Role" }, { key: "department", label: "Department" }]} /></>;
}
