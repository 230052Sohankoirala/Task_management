export function StatCard({ icon: Icon, label, value, tone = "blue" }) {
  return (
    <section className={`stat-card tone-${tone}`}>
      <span><Icon size={19} /></span>
      <div>
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
    </section>
  );
}
