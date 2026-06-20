import { PageHeader } from "../../components/layout/PageHeader";
import { activities } from "../../data/activities";

export default function ActivityLog() {
  return <><PageHeader title="Activity Log" description="A workspace-wide audit trail of changes." /><section className="timeline">{activities.map((item) => <article key={item.id}><strong>{item.action}</strong><span>{item.target}</span><small>{item.createdAt}</small></article>)}</section></>;
}
