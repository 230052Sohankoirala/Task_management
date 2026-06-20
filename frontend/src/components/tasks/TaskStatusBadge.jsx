import { Badge } from "../common/Badge";

export function TaskStatusBadge({ status }) {
  const tone = status === "Done" ? "green" : status === "In Progress" ? "blue" : status === "In Review" ? "purple" : "neutral";
  return <Badge tone={tone}>{status}</Badge>;
}
