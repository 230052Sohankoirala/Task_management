import { useContext, useState } from "react";
import { TeamContext } from "../../contexts/TeamContext";
import { UserContext } from "../../contexts/UserContext";
import { ROLES } from "../../utils/constants";
import { Button } from "../common/Button";
import { Input, Select, Textarea } from "../common/Form";

export function TeamForm({ team, onSaved }) {
  const { saveTeam } = useContext(TeamContext);
  const { users } = useContext(UserContext);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(team || { name: "", description: "", leaderId: "", memberIds: [], projectIds: [] });
  const managers = users.filter((user) => user.role === ROLES.PROJECT_MANAGER || user.role === ROLES.ADMIN);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await saveTeam(form);
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>Team name<Input value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
      <label>Project manager<Select value={form.leaderId || ""} onChange={(event) => update("leaderId", event.target.value)}><option value="">Unassigned</option>{managers.map((manager) => <option key={manager.id} value={manager.id}>{manager.name}</option>)}</Select></label>
      <label className="span-2">Members<Select className="field multi-select" multiple value={form.memberIds || []} onChange={(event) => update("memberIds", Array.from(event.target.selectedOptions, (option) => option.value))}>{users.map((user) => <option key={user.id} value={user.id}>{user.name} - {user.role}</option>)}</Select></label>
      <label className="span-2">Description<Textarea value={form.description} onChange={(event) => update("description", event.target.value)} /></label>
      <Button loading={saving}>Save team</Button>
    </form>
  );
}
