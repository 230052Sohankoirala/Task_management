import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Form";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    department: "",
    jobTitle: "",
  });

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await register(form);
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit account request");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="auth-card">
        <h2>Request sent</h2>
        <p>Your account request is waiting for admin approval. You can sign in after an admin assigns your role and approves access.</p>
        <Link className="btn btn-primary btn-md" to="/login"><span>Back to login</span></Link>
      </section>
    );
  }

  return (
    <form className="auth-card" onSubmit={submit}>
      <h2>Request access</h2>
      <p>Create your workspace profile. An admin will assign your role and approve access before login is enabled.</p>
      <label>Full name<Input placeholder="FullName" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
      <label>Username<Input placeholder="Username" autoComplete="username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required /></label>
      <label>Email<Input type="email" placeholder="name@company.com" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
      <label>Password<Input type="password" placeholder="Minimum 6 characters" autoComplete="new-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength={6} /></label>
      <label>Department<Input placeholder="Engineering, Product, Operations" value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} /></label>
      <label>Job title<Input placeholder="Frontend Developer" value={form.jobTitle} onChange={(event) => setForm({ ...form, jobTitle: event.target.value })} /></label>
      <Button loading={loading}>Send request</Button>
      <p><Link to="/login">Already approved?</Link></p>
    </form>
  );
}
