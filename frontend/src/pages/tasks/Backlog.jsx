import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Play, Trophy } from "lucide-react";
import { TaskContext } from "../../contexts/TaskContext";
import { sprints as seedSprints } from "../../data/sprints";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { PageHeader } from "../../components/layout/PageHeader";
import { TaskCard } from "../../components/tasks/TaskCard";

export default function Backlog({ embedded = false }) {
  const { tasks } = useContext(TaskContext);
  const [sprints, setSprints] = useState(seedSprints);
  const backlog = tasks.filter((task) => !task.sprintId);
  const createSprint = () => setSprints((current) => [{ id: `s${Date.now()}`, name: `Sprint ${current.length + 16}`, goal: "New sprint goal", startDate: "2026-07-25", endDate: "2026-08-08", status: "Planned", taskIds: [], storyPoints: 0 }, ...current]);
  return (
    <>
      {!embedded ? <PageHeader title="Backlog" description="Shape upcoming work into focused sprint sections." action={<Button icon={Plus} onClick={createSprint}>Create sprint</Button>} /> : null}
      <div className="backlog-space">
        {sprints.map((sprint) => <Card key={sprint.id}><header className="split"><div><h3>{sprint.name}</h3><p>{sprint.goal} · {sprint.startDate} to {sprint.endDate}</p></div><div className="inline-stack"><Button icon={Play} variant="ghost" onClick={() => toast.success("Sprint started")}>Start</Button><Button icon={Trophy} variant="ghost" onClick={() => toast.success("Sprint completed")}>Complete</Button></div></header><div className="task-grid">{tasks.filter((task) => sprint.taskIds.includes(task.id)).map((task) => <TaskCard key={task.id} task={task} />)}</div><footer>{sprint.taskIds.length} tasks · {sprint.storyPoints} points</footer></Card>)}
        <Card><h3>Backlog</h3><div className="task-grid">{backlog.map((task) => <TaskCard key={task.id} task={task} />)}</div></Card>
      </div>
    </>
  );
}
