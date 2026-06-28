import { useContext } from "react";
import { EmptyState } from "../../components/common/State";
import { PageHeader } from "../../components/layout/PageHeader";
import { ActivityContext } from "../../contexts/ActivityContext";

export default function ActivityLog() {
  const { activities } = useContext(ActivityContext);

  return <><PageHeader title="Activity Log" description="A workspace-wide audit trail of changes." />{activities.length ? <section className="timeline">{activities.map((item) => <article key={item.id}><strong>{item.action}</strong><span>{item.message}</span><small>{item.createdAt}</small></article>)}</section> : <EmptyState title="No activity yet" description="Workspace actions will appear here after you start creating records." />}</>;
}
