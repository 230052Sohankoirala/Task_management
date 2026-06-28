import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { projectService } from "../services/projectService";

export const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useLocalStorage("taskmanagement.projects", []);

  useEffect(() => {
    let mounted = true;

    if (!user) {
      setProjects([]);
      return () => {
        mounted = false;
      };
    }

    projectService.list()
      .then((data) => {
        if (mounted && Array.isArray(data)) setProjects(data);
      })
      .catch((error) => toast.error(error.response?.data?.message || "Could not load projects"));

    return () => {
      mounted = false;
    };
  }, [setProjects, user]);

  const saveProject = useCallback(async (project) => {
    let saved;

    try {
      saved = project.id ? await projectService.update(project.id, project) : await projectService.save(project);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save project");
      throw error;
    }

    setProjects((current) => {
      const nextProject = saved?.id ? saved : { ...project, id: project.id || `p${Date.now()}` };
      const exists = current.some((item) => item.id === nextProject.id);
      return exists ? current.map((item) => (item.id === nextProject.id ? nextProject : item)) : [nextProject, ...current];
    });
    toast.success("Project saved");
    return saved;
  }, [setProjects]);

  const value = useMemo(() => ({ projects, setProjects, saveProject }), [projects, setProjects, saveProject]);
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
