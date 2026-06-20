import { Bug, CheckSquare, GitBranch, Layers, ListChecks } from "lucide-react";

export function TaskTypeIcon({ type }) {
  const icons = { Epic: Layers, Story: GitBranch, Task: CheckSquare, Bug, Subtask: ListChecks };
  const Icon = icons[type] || CheckSquare;
  return <Icon size={16} className={`type-${String(type).toLowerCase()}`} />;
}
