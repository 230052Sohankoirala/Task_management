import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Form";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "avery@flowdesk.dev", password: "password", remember: true });
  return (
    <form className="auth-card" onSubmit={(event) => { event.preventDefault(); login(form); navigate("/"); }}>
      <h2>Sign in</h2>
      <label>Email<Input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
      <label>Password<Input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
      <label className="check"><input type="checkbox" checked={form.remember} onChange={(event) => setForm({ ...form, remember: event.target.checked })} />Remember me</label>
      <Button>Login</Button>
      <p><Link to="/forgot-password">Forgot password?</Link> · <Link to="/register">Create account</Link></p>
    </form>
  );
}
