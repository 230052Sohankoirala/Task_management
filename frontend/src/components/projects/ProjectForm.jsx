import { useContext, useState } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { users } from "../../data/users";
import { Button } from "../common/Button";
import { DateInput, Input, Select, Textarea } from "../common/Form";

export function ProjectForm({ project, onSaved }) {
  const { saveProject } = useContext(ProjectContext);
  const [form, setForm] = useState(project || { name: "", key: "", description: "", leadId: "u2", memberIds: ["u2", "u4"], startDate: "2026-06-20", dueDate: "2026-08-01", status: "Planning", priority: "Medium", progress: 0, color: "#2563eb" });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <form className="form-grid" onSubmit={(event) => { event.preventDefault(); saveProject(form); onSaved?.(); }}>
      <label>Name<Input value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
      <label>Key<Input value={form.key} onChange={(event) => update("key", event.target.value.toUpperCase())} required /></label>
      <label>Lead<Select value={form.leadId} onChange={(event) => update("leadId", event.target.value)}>{users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</Select></label>
      <label>Status<Input value={form.status} onChange={(event) => update("status", event.target.value)} /></label>
      <label>Priority<Input value={form.priority} onChange={(event) => update("priority", event.target.value)} /></label>
      <label>Due date<DateInput value={form.dueDate} onChange={(event) => update("dueDate", event.target.value)} /></label>
      <label className="span-2">Description<Textarea value={form.description} onChange={(event) => update("description", event.target.value)} /></label>
      <Button>Save project</Button>
    </form>
  );
}
