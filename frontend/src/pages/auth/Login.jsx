import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Form";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: true });

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-card" onSubmit={submit}>
      <h2>Sign in</h2>
      <p>Use your workspace account or the demo credentials shown on the left.</p>
      <label>Email<Input type="email" placeholder="name@company.com" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
      <label>Password<Input type="password" placeholder="Enter your password" autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
      <label className="check"><input type="checkbox" checked={form.remember} onChange={(event) => setForm({ ...form, remember: event.target.checked })} />Remember me</label>
      <Button loading={loading}>Login</Button>
      <p><Link to="/forgot-password">Forgot password?</Link> - <Link to="/register">Request access</Link></p>
    </form>
  );
}
