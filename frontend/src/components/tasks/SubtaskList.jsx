import { CheckSquare } from "lucide-react";

export function SubtaskList({ subtasks = [] }) {
  return <section className="card"><h3>Subtasks</h3>{subtasks.length ? subtasks.map((item) => <p key={item}><CheckSquare size={15} />{item}</p>) : <p>No subtasks</p>}</section>;
}
