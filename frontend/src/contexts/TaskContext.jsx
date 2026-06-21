import { createContext, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("taskmanagement.tasks", []);
  const [sprints, setSprints] = useLocalStorage("taskmanagement.sprints", []);

  const saveTask = useCallback((task) => {
    setTasks((current) => {
      const exists = current.some((item) => item.id === task.id);
      return exists ? current.map((item) => (item.id === task.id ? task : item)) : [{ ...task, id: `t${Date.now()}`, key: task.key || `NEW-${current.length + 1}` }, ...current];
    });
    toast.success("Task saved");
  }, [setTasks]);

  const updateTaskStatus = useCallback((taskId, status) => {
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, status } : task)));
    toast.success(`Moved to ${status}`);
  }, [setTasks]);

  const createSprint = useCallback(() => {
    setSprints((current) => {
      const nextNumber = current.length + 1;
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 14);

      return [{
        id: `s${Date.now()}`,
        name: `Sprint ${nextNumber}`,
        goal: "Plan focused work for the team",
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        status: "Planned",
        taskIds: [],
        storyPoints: 0,
      }, ...current];
    });
    toast.success("Sprint created");
  }, [setSprints]);

  const assignTaskToSprint = useCallback((taskId, sprintId, options = {}) => {
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, sprintId } : task)));
    if (!options.silent) toast.success("Task added to sprint");
  }, [setTasks]);

  const removeTaskFromSprint = useCallback((taskId) => {
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, sprintId: "", status: task.status === "Done" ? "Done" : "Backlog" } : task)));
    toast.success("Task moved to backlog");
  }, [setTasks]);

  const startSprint = useCallback((sprintId) => {
    const sprintTasks = tasks.filter((task) => task.sprintId === sprintId);
    if (sprintTasks.length === 0) {
      toast.error("Add tasks before starting the sprint");
      return;
    }

    setSprints((current) => current.map((sprint) => {
      if (sprint.id === sprintId) return { ...sprint, status: "Active" };
      if (sprint.status === "Active") return { ...sprint, status: "Planned" };
      return sprint;
    }));
    setTasks((current) => current.map((task) => (task.sprintId === sprintId && task.status === "Backlog" ? { ...task, status: "To Do" } : task)));
    toast.success("Sprint started");
  }, [setSprints, setTasks, tasks]);

  const completeSprint = useCallback((sprintId) => {
    setSprints((current) => current.map((sprint) => (sprint.id === sprintId ? { ...sprint, status: "Completed" } : sprint)));
    setTasks((current) => current.map((task) => (task.sprintId === sprintId && task.status !== "Done" ? { ...task, sprintId: "", status: "Backlog" } : task)));
    toast.success("Sprint completed");
  }, [setSprints, setTasks]);

  const deleteTask = useCallback((taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
    toast.success("Task deleted");
  }, [setTasks]);

  const tasksBySprint = useMemo(() => tasks.reduce((groups, task) => {
    if (!task.sprintId) return groups;
    if (!groups[task.sprintId]) groups[task.sprintId] = [];
    groups[task.sprintId].push(task);
    return groups;
  }, {}), [tasks]);

  const sprintSummaries = useMemo(() => sprints.map((sprint) => {
    const sprintTasks = tasksBySprint[sprint.id] || [];
    return {
      ...sprint,
      taskIds: sprintTasks.map((task) => task.id),
      storyPoints: sprintTasks.reduce((total, task) => total + Number(task.storyPoints || 0), 0),
    };
  }), [sprints, tasksBySprint]);
  const activeSprint = useMemo(() => sprintSummaries.find((sprint) => sprint.status === "Active") || null, [sprintSummaries]);

  const value = useMemo(() => ({
    tasks,
    sprints: sprintSummaries,
    activeSprint,
    setTasks,
    saveTask,
    updateTaskStatus,
    deleteTask,
    createSprint,
    assignTaskToSprint,
    removeTaskFromSprint,
    startSprint,
    completeSprint,
  }), [tasks, sprintSummaries, activeSprint, setTasks, saveTask, updateTaskStatus, deleteTask, createSprint, assignTaskToSprint, removeTaskFromSprint, startSprint, completeSprint]);
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
