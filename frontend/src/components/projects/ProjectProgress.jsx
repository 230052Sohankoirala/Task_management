import { ProgressBar } from "../common/ProgressBar";

export function ProjectProgress({ project }) {
  return <section className="card"><h3>Project progress</h3><ProgressBar value={project.progress} /><strong>{project.progress}% complete</strong></section>;
}
