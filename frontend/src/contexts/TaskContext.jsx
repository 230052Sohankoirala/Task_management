import { createContext, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { tasks as seedTasks } from "../data/tasks";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", seedTasks);

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

  const deleteTask = useCallback((taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
    toast.success("Task deleted");
  }, [setTasks]);

  const value = useMemo(() => ({ tasks, setTasks, saveTask, updateTaskStatus, deleteTask }), [tasks, setTasks, saveTask, updateTaskStatus, deleteTask]);
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
