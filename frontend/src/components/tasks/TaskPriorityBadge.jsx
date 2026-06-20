import { Badge } from "../common/Badge";

export function TaskPriorityBadge({ priority }) {
  const tone = priority === "Critical" ? "red" : priority === "High" ? "orange" : priority === "Low" ? "green" : "blue";
  return <Badge tone={tone}>{priority}</Badge>;
}
