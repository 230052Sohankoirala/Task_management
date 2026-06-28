import { useContext, useState } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { UserContext } from "../../contexts/UserContext";
import { PRIORITIES } from "../../utils/constants";
import { Button } from "../common/Button";
import { DateInput, Input, Select, Textarea } from "../common/Form";

export function ProjectForm({ project, onSaved }) {
  const { saveProject } = useContext(ProjectContext);
  const { users } = useContext(UserContext);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(project || { name: "", key: "", description: "", leadId: "", memberIds: [], startDate: "", dueDate: "", status: "Planning", priority: "Medium", progress: 0, color: "#2563eb" });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await saveProject(form);
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>Name<Input value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
      <label>Key<Input value={form.key} onChange={(event) => update("key", event.target.value.toUpperCase())} required /></label>
      <label>Lead<Select value={form.leadId} onChange={(event) => update("leadId", event.target.value)}><option value="">No lead</option>{users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</Select></label>
      <label>Status<Select value={form.status} onChange={(event) => update("status", event.target.value)}>{["Planning", "In Progress", "On Track", "At Risk", "Completed", "Archived"].map((item) => <option key={item}>{item}</option>)}</Select></label>
      <label>Priority<Select value={form.priority} onChange={(event) => update("priority", event.target.value)}>{PRIORITIES.map((item) => <option key={item}>{item}</option>)}</Select></label>
      <label>Due date<DateInput value={form.dueDate} onChange={(event) => update("dueDate", event.target.value)} /></label>
      <label className="span-2">Description<Textarea value={form.description} onChange={(event) => update("description", event.target.value)} /></label>
      <Button loading={saving}>Save project</Button>
    </form>
  );
}
