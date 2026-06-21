import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, CheckSquare, ListChecks, Play, Plus, RotateCcw, Trophy } from "lucide-react";
import { TaskContext } from "../../contexts/TaskContext";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { PageHeader } from "../../components/layout/PageHeader";
import { TaskCard } from "../../components/tasks/TaskCard";

function ProductBacklogCard({ backlog, selectedTaskIds, toggleSelectedTask, clearSelection }) {
  return (
    <Card className="product-backlog-card">
      <header className="split">
        <div className="inline-stack">
          <CheckSquare size={20} />
          <div>
            <h3>Product Backlog</h3>
            <p>Select items once, then add them to the sprint you choose.</p>
          </div>
        </div>
        <div className="inline-stack">
          <span className="sprint-status">{selectedTaskIds.length} selected</span>
          <Link className="btn btn-ghost btn-md" to="/tasks/create"><Plus size={16} /><span>Create backlog task</span></Link>
        </div>
      </header>

      {backlog.length ? (
        <div className="product-backlog-list">
          {backlog.map((task) => (
            <label key={task.id} className={`backlog-check ${selectedTaskIds.includes(task.id) ? "selected" : ""}`}>
              <input
                type="checkbox"
                checked={selectedTaskIds.includes(task.id)}
                onChange={() => toggleSelectedTask(task.id)}
              />
              <span>{task.key}</span>
              <strong>{task.title}</strong>
              <small>{task.storyPoints} pts</small>
            </label>
          ))}
        </div>
      ) : <div className="empty-inline"><Link className="btn btn-ghost btn-md" to="/tasks/create"><Plus size={16} /><span>Create backlog task</span></Link></div>}

      {selectedTaskIds.length ? <Button icon={RotateCcw} variant="ghost" size="sm" onClick={clearSelection}>Clear selection</Button> : null}
    </Card>
  );
}

function SprintSection({ sprint, tasks, selectedTaskIds, clearSelection, assignTaskToSprint, removeTaskFromSprint, startSprint, completeSprint }) {
  const canStart = sprint.status !== "Active" && sprint.status !== "Completed";
  const canComplete = sprint.status === "Active";
  const emptyText = sprint.status === "Completed" ? "No completed work stayed in this sprint." : "Add selected product backlog items to plan this sprint.";
  const selectedCount = selectedTaskIds.length;

  const addSelectedTasks = () => {
    if (!selectedCount) return;
    selectedTaskIds.forEach((taskId) => assignTaskToSprint(taskId, sprint.id, { silent: true }));
    clearSelection();
    toast.success(`${selectedCount} task${selectedCount === 1 ? "" : "s"} added to sprint`);
  };

  return (
    <Card className={`sprint-card sprint-${sprint.status.toLowerCase()}`}>
      <header className="sprint-head">
        <div>
          <div className="inline-stack">
            <h3>{sprint.name}</h3>
            <span className="sprint-status">{sprint.status}</span>
          </div>
          <p>{sprint.goal} / {sprint.startDate} to {sprint.endDate}</p>
        </div>
        <div className="inline-stack">
          <Button icon={Play} variant="ghost" disabled={!canStart} onClick={() => startSprint(sprint.id)}>Start</Button>
          <Button icon={Trophy} variant="ghost" disabled={!canComplete} onClick={() => completeSprint(sprint.id)}>Complete</Button>
        </div>
      </header>

      {sprint.status !== "Completed" ? (
        <section className="sprint-add">
          <div>
            <strong>{selectedCount} selected from Product Backlog</strong>
            <p>Add the checked backlog items to this sprint backlog.</p>
          </div>
          <Button icon={ArrowRight} variant="ghost" disabled={!selectedCount} onClick={addSelectedTasks}>Add selected{selectedCount ? ` (${selectedCount})` : ""}</Button>
        </section>
      ) : null}

      {tasks.length ? (
        <div className="task-grid">
          {tasks.map((task) => (
            <div className="sprint-task" key={task.id}>
              <TaskCard task={task} />
              {sprint.status !== "Completed" ? <Button icon={RotateCcw} variant="ghost" size="sm" onClick={() => removeTaskFromSprint(task.id)}>Backlog</Button> : null}
            </div>
          ))}
        </div>
      ) : <div className="empty-inline">{emptyText}</div>}

      <footer className="sprint-foot">
        <span>{tasks.length} tasks</span>
        <span>{sprint.storyPoints} points</span>
      </footer>
    </Card>
  );
}

export default function Backlog({ embedded = false }) {
  const { tasks, sprints, createSprint, assignTaskToSprint, removeTaskFromSprint, startSprint, completeSprint } = useContext(TaskContext);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const backlog = useMemo(() => tasks.filter((task) => !task.sprintId), [tasks]);
  const tasksBySprint = useMemo(() => tasks.reduce((groups, task) => {
    if (!task.sprintId) return groups;
    if (!groups[task.sprintId]) groups[task.sprintId] = [];
    groups[task.sprintId].push(task);
    return groups;
  }, {}), [tasks]);

  const orderedSprints = useMemo(() => [...sprints].sort((a, b) => {
    const order = { Active: 0, Planned: 1, Completed: 2 };
    return order[a.status] - order[b.status] || a.startDate.localeCompare(b.startDate);
  }), [sprints]);

  const toggleSelectedTask = (taskId) => {
    setSelectedTaskIds((current) => current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId]);
  };

  const clearSelection = () => {
    setSelectedTaskIds([]);
  };

  return (
    <>
      {!embedded ? (
        <PageHeader
          title="Backlog"
          description="Plan work into sprints, then start a sprint to send its tasks to the board."
          action={(
            <div className="inline-stack">
              <Link className="btn btn-ghost btn-md" to="/tasks/create"><Plus size={16} /><span>Create backlog task</span></Link>
              <Button icon={Plus} onClick={createSprint}>Create sprint</Button>
            </div>
          )}
        />
      ) : null}

      <div className="backlog-space">
        <Card className="backlog-summary">
          <div>
            <ListChecks size={22} />
            <div>
              <strong>{backlog.length} backlog tasks</strong>
              <p>Unplanned work stays here until it is added to a sprint.</p>
            </div>
          </div>
          <div className="inline-stack">
            <Link className="btn btn-ghost btn-md" to="/tasks/create"><Plus size={16} /><span>Create backlog task</span></Link>
            {embedded ? <Button icon={Plus} onClick={createSprint}>Create sprint</Button> : null}
          </div>
        </Card>

        {orderedSprints.map((sprint) => (
          <SprintSection
            key={sprint.id}
            sprint={sprint}
            tasks={tasksBySprint[sprint.id] || []}
            selectedTaskIds={selectedTaskIds}
            clearSelection={clearSelection}
            assignTaskToSprint={assignTaskToSprint}
            removeTaskFromSprint={removeTaskFromSprint}
            startSprint={startSprint}
            completeSprint={completeSprint}
          />
        ))}

        <ProductBacklogCard backlog={backlog} selectedTaskIds={selectedTaskIds} toggleSelectedTask={toggleSelectedTask} clearSelection={clearSelection} />
      </div>
    </>
  );
}
