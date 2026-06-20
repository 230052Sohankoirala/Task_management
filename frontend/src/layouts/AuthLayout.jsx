import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="auth-layout">
      <section className="auth-visual">
        <span>FlowDesk</span>
        <h1>Plan work, move faster, stay aligned.</h1>
        <p>A frontend-only project workspace with realistic data, charts, board movement, and local persistence.</p>
      </section>
      <section className="auth-panel">
        <Outlet />
      </section>
    </main>
  );
}
