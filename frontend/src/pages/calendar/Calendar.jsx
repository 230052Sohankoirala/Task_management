import { useContext, useState } from "react";
import { addDays, format, startOfWeek } from "date-fns";
import { TaskContext } from "../../contexts/TaskContext";
import { Tabs } from "../../components/common/Tabs";
import { PageHeader } from "../../components/layout/PageHeader";

export default function Calendar() {
  const { tasks } = useContext(TaskContext);
  const [view, setView] = useState("Month");
  const days = Array.from({ length: view === "Week" ? 7 : 30 }, (_, index) => addDays(startOfWeek(new Date()), index));
  return <><PageHeader title="Calendar" description="Task due dates, project deadlines, sprint dates, meetings, and events." /><Tabs tabs={["Month", "Week", "List"]} active={view} onChange={setView} />{view === "List" ? <div className="stack">{tasks.slice(0, 12).map((task) => <article className="card" key={task.id}>{task.dueDate} · {task.key} · {task.title}</article>)}</div> : <div className="calendar-grid">{days.map((day) => <article key={day.toISOString()}><strong>{format(day, "d")}</strong>{tasks.filter((task) => task.dueDate === format(day, "yyyy-MM-dd")).slice(0, 2).map((task) => <span key={task.id}>{task.key}</span>)}</article>)}</div>}</>;
}
