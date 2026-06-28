import { useContext } from "react";
import { AlertTriangle, CalendarClock, CheckCircle2, Clock, FolderKanban, ListTodo, Plus, Timer, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TaskContext } from "../../contexts/TaskContext";
import { ActivityContext } from "../../contexts/ActivityContext";
import { useAuth } from "../../hooks/useAuth";
import { formatDate, isOverdue } from "../../utils/formatters";
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
  const { activities } = useContext(ActivityContext);
  const { user } = useAuth();
  const done = tasks.filter((task) => task.status === "Done").length;
  const activeProjects = projects.filter((project) => project.status !== "Completed");
  const inProgress = tasks.filter((task) => task.status === "In Progress");
  const overdueTasks = tasks.filter((task) => isOverdue(task.dueDate, task.status));
  const upcomingTasks = [...tasks]
    .filter((task) => task.status !== "Done" && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);
  const criticalTasks = tasks
    .filter((task) => ["Critical", "High"].includes(task.priority) && task.status !== "Done")
    .slice(0, 3);
  const completionRate = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));

  return (
    <>
      <PageHeader title="Workspace dashboard" description={`Welcome back${user?.name ? `, ${user.name}` : ""}. Focus on priority work, project health, and upcoming deadlines.`} action={<Link to="/tasks/create"><Button icon={Plus}>Create task</Button></Link>} />
      <section className="command-center">
        <div>
          <span className="eyebrow">Today</span>
          <h2>{criticalTasks.length ? `${criticalTasks.length} high-impact tasks need attention` : "Your workspace is under control"}</h2>
          <p>{overdueTasks.length ? `${overdueTasks.length} overdue item${overdueTasks.length === 1 ? "" : "s"} should be handled before new work starts.` : "No overdue work. Keep the team moving through the active queue."}</p>
        </div>
        <div className="focus-strip">
          <span><TrendingUp size={17} />{completionRate}% completion</span>
          <span><Users size={17} />{activeProjects.length} active projects</span>
          <span><CalendarClock size={17} />{upcomingTasks.length} deadlines</span>
        </div>
      </section>
      <div className="stats-grid">
        <StatCard icon={FolderKanban} label="Total projects" value={projects.length} />
        <StatCard icon={ListTodo} label="Total tasks" value={tasks.length} tone="purple" />
        <StatCard icon={Clock} label="In progress" value={inProgress.length} tone="orange" />
        <StatCard icon={CheckCircle2} label="Completed" value={done} tone="green" />
        <StatCard icon={AlertTriangle} label="Overdue" value={overdueTasks.length} tone="red" />
        <StatCard icon={Timer} label="Assigned to me" value={tasks.filter((task) => task.assigneeId === user?.id).length} />
      </div>
      <div className="dashboard-grid">
        <ChartCard title="Task status"><StatusPie tasks={tasks} /></ChartCard>
        <ChartCard title="Priority distribution"><PriorityBar tasks={tasks} /></ChartCard>
        <ChartCard title="Progress trend"><ProgressLine tasks={tasks} /></ChartCard>
      </div>
      <div className="work-grid">
        <Card>
          <div className="section-head">
            <h3>Active projects</h3>
            <Link to="/projects">View all</Link>
          </div>
          <div className="project-health-list">
            {activeProjects.slice(0, 4).map((project) => (
              <Link to={`/projects/${project.id}`} className="project-health-row" key={project.id}>
                <span style={{ background: project.color || "#2563eb" }} />
                <div>
                  <strong>{project.name}</strong>
                  <small>{project.status} - due {formatDate(project.dueDate)}</small>
                </div>
                <em>{project.progress || 0}%</em>
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <div className="section-head">
            <h3>Priority queue</h3>
            <Link to="/my-work">My work</Link>
          </div>
          <TaskList tasks={criticalTasks.length ? criticalTasks : upcomingTasks.slice(0, 3)} />
        </Card>
      </div>
      <div className="two-col">
        <Card>
          <div className="section-head">
            <h3>Recent activity</h3>
            <Link to="/activity">Audit trail</Link>
          </div>
          <div className="activity-list">
            {activities.length ? activities.slice(0, 6).map((item) => <p key={item.id}>{item.message}</p>) : <p>No activity yet.</p>}
          </div>
        </Card>
        <Card>
          <div className="section-head">
            <h3>Upcoming deadlines</h3>
            <Link to="/calendar">Calendar</Link>
          </div>
          <div className="deadline-list">
            {upcomingTasks.map((task) => (
              <Link to={`/tasks/${task.id}`} key={task.id}>
                <strong>{task.title}</strong>
                <span>{projectById[task.projectId]?.name || "No project"} - {formatDate(task.dueDate)}</span>
              </Link>
            ))}
            {!upcomingTasks.length ? <p>No upcoming deadlines.</p> : null}
          </div>
        </Card>
      </div>
    </>
  );
}
