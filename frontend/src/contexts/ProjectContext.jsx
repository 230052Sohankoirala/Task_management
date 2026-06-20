import { createContext, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { projects as seedProjects } from "../data/projects";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useLocalStorage("projects", seedProjects);

  const saveProject = useCallback((project) => {
    setProjects((current) => {
      const exists = current.some((item) => item.id === project.id);
      return exists ? current.map((item) => (item.id === project.id ? project : item)) : [{ ...project, id: `p${Date.now()}` }, ...current];
    });
    toast.success("Project saved");
  }, [setProjects]);

  const value = useMemo(() => ({ projects, setProjects, saveProject }), [projects, setProjects, saveProject]);
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
