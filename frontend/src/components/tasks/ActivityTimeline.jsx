import { useContext } from "react";
import { ActivityContext } from "../../contexts/ActivityContext";

export function ActivityTimeline() {
  const { activities } = useContext(ActivityContext);

  return <section className="timeline">{activities.slice(0, 6).map((item) => <article key={item.id}><strong>{item.action}</strong><span>{item.message}</span></article>)}</section>;
}
