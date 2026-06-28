import { useContext, useState } from "react";
import { Edit, Plus, Users } from "lucide-react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TeamContext } from "../../contexts/TeamContext";
import { UserContext } from "../../contexts/UserContext";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Table } from "../../components/common/Table";
import { PageHeader } from "../../components/layout/PageHeader";
import { ProjectForm } from "../../components/projects/ProjectForm";
import { ROLES } from "../../utils/constants";

const unique = (items) => [...new Set(items.filter(Boolean))];

export default function ProjectManagement() {
  const { projects, saveProject } = useContext(ProjectContext);
  const { teams, saveTeam } = useContext(TeamContext);
  const { users } = useContext(UserContext);
  const [editing, setEditing] = useState(null);
  const [assignment, setAssignment] = useState({});
  const [savingAssignment, setSavingAssignment] = useState(null);

  const archiveProject = (project) => saveProject({ ...project, status: "Archived" });
  const projectManagers = users.filter((user) => user.role === ROLES.PROJECT_MANAGER || user.role === ROLES.ADMIN);
  const userById = Object.fromEntries(users.map((user) => [user.id, user]));

  const assignmentFor = (team) => ({
    managerId: assignment[team.id]?.managerId ?? team.leaderId ?? team.leadId ?? "",
    projectId: assignment[team.id]?.projectId ?? team.projectIds?.[0] ?? "",
  });

  const updateAssignment = (teamId, key, value) => {
    setAssignment((current) => ({
      ...current,
      [teamId]: { ...current[teamId], [key]: value },
    }));
  };

  const assignTeam = async (team) => {
    const next = assignmentFor(team);
    const project = projects.find((item) => item.id === next.projectId);
    if (!next.managerId || !next.projectId || !project) return;

    setSavingAssignment(team.id);
    try {
      const memberIds = unique([...(team.memberIds || []), next.managerId]);
      const projectIds = unique([...(team.projectIds || []), next.projectId]);

      await saveTeam({
        ...team,
        leaderId: next.managerId,
        leadId: next.managerId,
        memberIds,
        projectIds,
      });

      await saveProject({
        ...project,
        leadId: next.managerId,
        teamIds: unique([...(project.teamIds || []), team.id]),
        memberIds: unique([...(project.memberIds || []), ...memberIds]),
      });
    } finally {
      setSavingAssignment(null);
    }
  };

  return (
    <>
      <PageHeader title="Project Management" description="Assign project managers, connect teams to projects, and control delivery status." action={<Button icon={Plus} onClick={() => setEditing({})}>New project</Button>} />
      <section className="stack">
        <div>
          <div className="section-head">
            <h3>Team assignments</h3>
            <span className="muted-copy">Admin controls which project manager owns each team and project.</span>
          </div>
          <Table rows={teams} columns={[
            { key: "name", label: "Team" },
            { key: "leader", label: "Current manager", render: (team) => userById[team.leaderId || team.leadId]?.name || "Unassigned" },
            { key: "manager", label: "Assign manager", render: (team) => <select className="field table-select" value={assignmentFor(team).managerId} onChange={(event) => updateAssignment(team.id, "managerId", event.target.value)}><option value="">Select manager</option>{projectManagers.map((manager) => <option key={manager.id} value={manager.id}>{manager.name}</option>)}</select> },
            { key: "project", label: "Assign project", render: (team) => <select className="field table-select" value={assignmentFor(team).projectId} onChange={(event) => updateAssignment(team.id, "projectId", event.target.value)}><option value="">Select project</option>{projects.filter((project) => project.status !== "Archived").map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select> },
            { key: "actions", label: "Action", render: (team) => {
              const next = assignmentFor(team);
              return <Button size="sm" icon={Users} loading={savingAssignment === team.id} disabled={!next.managerId || !next.projectId} onClick={() => assignTeam(team)}>Assign team</Button>;
            } },
          ]} />
        </div>

        <div>
          <h3>All projects</h3>
          <Table rows={projects} columns={[
            { key: "key", label: "Key" },
            { key: "name", label: "Name" },
            { key: "leadId", label: "Manager", render: (project) => userById[project.leadId]?.name || "Unassigned" },
            { key: "status", label: "Status", render: (project) => <Badge tone="blue">{project.status}</Badge> },
            { key: "priority", label: "Priority" },
            { key: "progress", label: "Progress", render: (project) => `${project.progress || 0}%` },
            { key: "actions", label: "Actions", render: (project) => <div className="inline-stack"><Button size="sm" variant="secondary" icon={Edit} onClick={() => setEditing(project)}>Edit</Button><Button size="sm" variant="ghost" onClick={() => archiveProject(project)}>Archive</Button></div> },
          ]} />
        </div>
      </section>
      <Modal open={Boolean(editing)} title={editing?.id ? "Edit project" : "Create project"} onClose={() => setEditing(null)}><ProjectForm project={editing?.id ? editing : null} onSaved={() => setEditing(null)} /></Modal>
    </>
  );
}
