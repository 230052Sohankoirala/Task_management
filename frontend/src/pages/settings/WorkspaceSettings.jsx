import { Button } from "../../components/common/Button";
import { FileUpload, Input, Textarea } from "../../components/common/Form";
import { PageHeader } from "../../components/layout/PageHeader";

export default function WorkspaceSettings() {
  return <><PageHeader title="Workspace Settings" description="Manage workspace defaults, invite rules, and permissions." /><section className="card"><form className="form-grid"><label>Workspace name<Input defaultValue="FlowDesk" /></label><label>Logo<FileUpload /></label><label className="span-2">Description<Textarea defaultValue="Modern task management workspace." /></label><label>Default statuses<Input defaultValue="Backlog, To Do, In Progress, In Review, Done" /></label><label>Default priorities<Input defaultValue="Critical, High, Medium, Low" /></label><label>Invite settings<Input defaultValue="Admins and project managers" /></label><label>Permissions<Input defaultValue="Role based" /></label><Button>Save workspace</Button></form></section></>;
}
