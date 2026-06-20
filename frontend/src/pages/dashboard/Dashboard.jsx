import { useContext } from "react";
import { AlertTriangle, CheckCircle2, Clock, FolderKanban, ListTodo, Plus, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TaskContext } from "../../contexts/TaskContext";
import { activities } from "../../data/activities";
import { isOverdue } from "../../utils/formatters";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { ChartCard } from "../../components/common/ChartCard";
import { StatCard } from "../../components/common/StatCard";
import { PageHeader } from "../../components/layout/PageHeader";
import { PriorityBar, ProgressLine, StatusPie } from "../../components/charts/TaskCharts";
import { TaskList } from "../../components/tasks/TaskList";

export default function Dashboard() {
  const { projects } = useContext(ProjectContext);
  const { tasks } = useContext(TaskContext);
  const done = tasks.filter((task) => task.status === "Done").length;
  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back. Here is the current delivery picture." action={<Link to="/tasks/create"><Button icon={Plus}>Quick create task</Button></Link>} />
      <div className="stats-grid">
        <StatCard icon={FolderKanban} label="Total projects" value={projects.length} />
        <StatCard icon={ListTodo} label="Total tasks" value={tasks.length} tone="purple" />
        <StatCard icon={Clock} label="In progress" value={tasks.filter((task) => task.status === "In Progress").length} tone="orange" />
        <StatCard icon={CheckCircle2} label="Completed" value={done} tone="green" />
        <StatCard icon={AlertTriangle} label="Overdue" value={tasks.filter((task) => isOverdue(task.dueDate, task.status)).length} tone="red" />
        <StatCard icon={Timer} label="Assigned to me" value={tasks.filter((task) => task.assigneeId === "u1").length} />
      </div>
      <div className="dashboard-grid">
        <ChartCard title="Task status"><StatusPie tasks={tasks} /></ChartCard>
        <ChartCard title="Priority distribution"><PriorityBar tasks={tasks} /></ChartCard>
        <ChartCard title="Progress trend"><ProgressLine /></ChartCard>
      </div>
      <div className="two-col">
        <Card><h3>Recent activity</h3>{activities.slice(0, 6).map((item) => <p key={item.id}>{item.action} {item.target}</p>)}</Card>
        <Card><h3>Upcoming deadlines</h3><TaskList tasks={tasks.slice(0, 3)} /></Card>
      </div>
    </>
  );
}
