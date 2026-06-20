import { activities } from "../../data/activities";

export function ActivityTimeline() {
  return <section className="timeline">{activities.slice(0, 6).map((item) => <article key={item.id}><strong>{item.action}</strong><span>{item.target}</span></article>)}</section>;
}
