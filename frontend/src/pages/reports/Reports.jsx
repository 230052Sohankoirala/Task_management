import { useContext } from "react";
import { ChartCard } from "../../components/common/ChartCard";
import { Select } from "../../components/common/Form";
import { PageHeader } from "../../components/layout/PageHeader";
import { PriorityBar, ProgressLine, StatusPie } from "../../components/charts/TaskCharts";
import { TaskContext } from "../../contexts/TaskContext";

export default function Reports() {
  const { tasks } = useContext(TaskContext);
  return <><PageHeader title="Reports" description="Status, priority, workload, velocity, progress, and overdue work." /><div className="filters"><Select><option>Date range</option></Select><Select><option>Project</option></Select><Select><option>Team</option></Select><Select><option>User</option></Select><Select><option>Status</option></Select></div><div className="dashboard-grid"><ChartCard title="Task status"><StatusPie tasks={tasks} /></ChartCard><ChartCard title="Priority distribution"><PriorityBar tasks={tasks} /></ChartCard><ChartCard title="Sprint velocity and burndown"><ProgressLine /></ChartCard></div></>;
}
