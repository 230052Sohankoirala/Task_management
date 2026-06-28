import { useContext } from "react";
import { ChartCard } from "../../components/common/ChartCard";
import { PageHeader } from "../../components/layout/PageHeader";
import { PriorityBar, ProgressLine, StatusPie } from "../../components/charts/TaskCharts";
import { TaskContext } from "../../contexts/TaskContext";

export default function Analytics() {
  const { tasks } = useContext(TaskContext);
  return <><PageHeader title="Analytics" description="Executive insight into workload, risk, and throughput." /><div className="dashboard-grid"><ChartCard title="Status"><StatusPie tasks={tasks} /></ChartCard><ChartCard title="Priority"><PriorityBar tasks={tasks} /></ChartCard><ChartCard title="Progress"><ProgressLine tasks={tasks} /></ChartCard></div></>;
}
