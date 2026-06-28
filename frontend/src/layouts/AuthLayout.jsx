import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="auth-layout">
      <section className="auth-visual">
        <span>TaskPilot</span>
        <h1>One workspace for focused delivery.</h1>
        <p>Manage projects, sprint work, assignments, reporting, approvals, and deadlines from a clear operational dashboard.</p>
        
      </section>
      <section className="auth-panel">
        <Outlet />
      </section>
    </main>
  );
}
