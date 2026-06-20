import { useState } from "react";
import { Button } from "../../components/common/Button";
import { Input, Textarea } from "../../components/common/Form";
import { PageHeader } from "../../components/layout/PageHeader";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState(user);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return <><PageHeader title="Profile" description="Update your identity, contact details, and password." /><section className="card"><form className="form-grid" onSubmit={(event) => { event.preventDefault(); updateProfile(form); }}><label>Full name<Input value={form.name} onChange={(event) => update("name", event.target.value)} /></label><label>Username<Input value={form.username} onChange={(event) => update("username", event.target.value)} /></label><label>Email<Input value={form.email} onChange={(event) => update("email", event.target.value)} /></label><label>Phone<Input value={form.phone} onChange={(event) => update("phone", event.target.value)} /></label><label>Job title<Input value={form.jobTitle} onChange={(event) => update("jobTitle", event.target.value)} /></label><label>Department<Input value={form.department} onChange={(event) => update("department", event.target.value)} /></label><label>Time zone<Input value={form.timezone} onChange={(event) => update("timezone", event.target.value)} /></label><label>Change password<Input type="password" placeholder="New password" /></label><label className="span-2">Bio<Textarea value={form.bio} onChange={(event) => update("bio", event.target.value)} /></label><Button>Edit profile</Button></form></section></>;
}
