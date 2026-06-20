import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Form";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", username: "", email: "" });
  return <form className="auth-card" onSubmit={(event) => { event.preventDefault(); register(form); navigate("/"); }}><h2>Create account</h2><label>Name<Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>Username<Input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} /></label><label>Email<Input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><Button>Register</Button><p><Link to="/login">Already have an account?</Link></p></form>;
}
