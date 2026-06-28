import { useContext } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { Table } from "../../components/common/Table";
import { UserContext } from "../../contexts/UserContext";

export default function Members() {
  const { users } = useContext(UserContext);

  return <><PageHeader title="Members" description="Workspace members and role assignments." /><Table rows={users} columns={[{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "role", label: "Role" }, { key: "department", label: "Department" }]} /></>;
}
