import { useContext, useMemo, useState } from "react";
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import { TASK_STATUSES } from "../../utils/constants";
import { Card } from "../common/Card";
import { TaskCard } from "../tasks/TaskCard";
import { TaskFilters } from "../tasks/TaskFilters";

function DraggableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });
  return <div ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform) }} {...listeners} {...attributes}><TaskCard task={task} /></div>;
}

function Column({ status, tasks }) {
  const [collapsed, setCollapsed] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <section className={`kanban-column ${isOver ? "over" : ""}`} ref={setNodeRef}>
      <header><button onClick={() => setCollapsed((value) => !value)}>{collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}{status}</button><span>{tasks.length}</span></header>
      {!collapsed ? <div className="kanban-stack">{tasks.map((task) => <DraggableTask key={task.id} task={task} />)}</div> : null}
    </section>
  );
}

export function KanbanBoard() {
  const { tasks, activeSprint, updateTaskStatus } = useContext(TaskContext);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("priority");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const sprintTasks = useMemo(() => activeSprint ? tasks.filter((task) => task.sprintId === activeSprint.id) : [], [activeSprint, tasks]);
  const filtered = useMemo(() => sprintTasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()) || task.key.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => !priority || task.priority === priority)
    .filter((task) => !type || task.type === type)
    .sort((a, b) => String(a[sort]).localeCompare(String(b[sort]))), [sprintTasks, search, priority, type, sort]);

  if (!activeSprint) {
    return (
      <Card className="state-card">
        <div className="state">
          <h3>No active sprint</h3>
          <p>Start a sprint from the backlog to see its tasks on this board.</p>
          <Link className="btn btn-primary btn-md" to="/backlog"><span>Open backlog</span></Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="board-space">
      <Card className="sprint-board-summary">
        <div>
          <h3>{activeSprint.name}</h3>
          <p>{activeSprint.goal} / {activeSprint.startDate} to {activeSprint.endDate}</p>
        </div>
        <div className="inline-stack">
          <span>{sprintTasks.length} tasks</span>
          <span>{activeSprint.storyPoints} points</span>
        </div>
      </Card>
      <div className="board-toolbar">
        <TaskFilters search={search} setSearch={setSearch} priority={priority} setPriority={setPriority} type={type} setType={setType} />
        <select className="field compact" value={sort} onChange={(event) => setSort(event.target.value)}><option value="priority">Sort priority</option><option value="dueDate">Sort due date</option><option value="storyPoints">Sort points</option></select>
      </div>
      <DndContext sensors={sensors} onDragEnd={({ active, over }) => { if (over?.id) updateTaskStatus(active.id, over.id); }}>
        <div className="kanban-board">
          {TASK_STATUSES.map((status) => <Column key={status} status={status} tasks={filtered.filter((task) => task.status === status)} />)}
        </div>
      </DndContext>
    </div>
  );
}
