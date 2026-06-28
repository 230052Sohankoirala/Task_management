import { useContext, useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/State";
import { PageHeader } from "../../components/layout/PageHeader";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TeamContext } from "../../contexts/TeamContext";
import { UserContext } from "../../contexts/UserContext";
import { adminService } from "../../services/adminService";
import { ROLES } from "../../utils/constants";

const assignableRoles = [ROLES.PROJECT_MANAGER, ROLES.TEAM_MEMBER];

function AssignmentField({ label, children }) {
  return (
    <label className="assignment-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function UserManagement() {
  const { users, loadUsers, updateUser } = useContext(UserContext);
  const { teams, loadTeams } = useContext(TeamContext);
  const { projects } = useContext(ProjectContext);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvalRoles, setApprovalRoles] = useState({});
  const [approvalProjects, setApprovalProjects] = useState({});
  const [approvalManagers, setApprovalManagers] = useState({});
  const [approvalTeams, setApprovalTeams] = useState({});
  const [userProjects, setUserProjects] = useState({});
  const [userManagers, setUserManagers] = useState({});
  const [userTeams, setUserTeams] = useState({});
  const [savingTeam, setSavingTeam] = useState(null);
  const userById = Object.fromEntries(users.map((user) => [user.id, user]));
  const projectManagers = users.filter((user) => user.role === ROLES.PROJECT_MANAGER);
  const activeProjects = projects.filter((project) => project.status !== "Archived");
  const teamOptions = (projectId = "") => [...teams]
    .sort((a, b) => Number((b.projectIds || []).includes(projectId)) - Number((a.projectIds || []).includes(projectId)))
    .map((team) => ({
      id: team.id,
      label: `${team.name}${team.leaderId && userById[team.leaderId] ? ` - ${userById[team.leaderId].name}` : " - no manager"}${projectId && (team.projectIds || []).includes(projectId) ? " - on project" : ""}`,
    }));

  const loadPending = async () => {
    const data = await adminService.pendingUsers();
    setPendingUsers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadPending();
  }, []);

  const approve = async (user) => {
    const role = approvalRoles[user.id] || ROLES.TEAM_MEMBER;
    const projectId = approvalProjects[user.id] || "";
    const managerId = approvalManagers[user.id] || "";
    const teamId = approvalTeams[user.id] || "";
    await adminService.approveUser(user.id, { role, projectId, managerId, teamId });
    toast.success(`${user.name} approved as ${role}`);
    await Promise.all([loadPending(), loadUsers(), loadTeams()]);
  };

  const assignApprovedUser = async (user) => {
    const projectId = userProjects[user.id] || "";
    const managerId = userManagers[user.id] || "";
    const teamId = userTeams[user.id] || user.teamIds?.[0] || "";
    if (!teamId && !managerId && user.role !== ROLES.PROJECT_MANAGER) return;

    setSavingTeam(user.id);
    try {
      await adminService.assignUserTeam(user.id, { teamId, projectId, managerId });
      toast.success(`${user.name} added to team`);
      await Promise.all([loadUsers(), loadTeams()]);
    } finally {
      setSavingTeam(null);
    }
  };

  const reject = async (user) => {
    await adminService.rejectUser(user.id, "Access request declined");
    toast.success(`${user.name} rejected`);
    await loadPending();
  };

  const renderProjectSelect = (value, onChange) => (
    <select className="field" value={value} onChange={onChange}>
      <option value="">No project</option>
      {activeProjects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
    </select>
  );

  return (
    <>
      <PageHeader title="User Management" description="Approve accounts, choose roles, and place people into the correct project manager team." />

      <section className="stack">
        <div>
          <div className="section-head">
            <h3>Pending access requests</h3>
            <span className="muted-copy">{pendingUsers.length} waiting</span>
          </div>
          {pendingUsers.length ? (
            <div className="admin-user-list">
              {pendingUsers.map((user) => {
                const selectedRole = approvalRoles[user.id] || ROLES.TEAM_MEMBER;
                const options = teamOptions(approvalProjects[user.id] || "");

                return (
                  <article className="admin-user-card" key={user.id}>
                    <div className="admin-user-main">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                      <small>{user.department || "No department"}{user.jobTitle ? ` - ${user.jobTitle}` : ""}</small>
                    </div>
                    <div className="assignment-grid">
                      <AssignmentField label="Role">
                        <select className="field" value={selectedRole} onChange={(event) => setApprovalRoles((current) => ({ ...current, [user.id]: event.target.value }))}>
                          {assignableRoles.map((role) => <option key={role}>{role}</option>)}
                        </select>
                      </AssignmentField>
                      <AssignmentField label="Project">
                        {renderProjectSelect(approvalProjects[user.id] || "", (event) => {
                          setApprovalProjects((current) => ({ ...current, [user.id]: event.target.value }));
                          setApprovalTeams((current) => ({ ...current, [user.id]: "" }));
                        })}
                      </AssignmentField>
                      <AssignmentField label="Project manager">
                        {selectedRole === ROLES.PROJECT_MANAGER ? <span className="readonly-pill">This user</span> : (
                          <select className="field" value={approvalManagers[user.id] || ""} onChange={(event) => setApprovalManagers((current) => ({ ...current, [user.id]: event.target.value }))}>
                            <option value="">Select manager</option>
                            {projectManagers.map((manager) => <option key={manager.id} value={manager.id}>{manager.name}</option>)}
                          </select>
                        )}
                      </AssignmentField>
                      <AssignmentField label="Team">
                        <select className="field" value={approvalTeams[user.id] || ""} onChange={(event) => setApprovalTeams((current) => ({ ...current, [user.id]: event.target.value }))}>
                          <option value="">Auto-create/use manager team</option>
                          {options.map((team) => <option key={team.id} value={team.id}>{team.label}</option>)}
                        </select>
                      </AssignmentField>
                    </div>
                    <div className="admin-card-actions">
                      <Button size="sm" icon={Check} onClick={() => approve(user)}>Approve</Button>
                      <Button size="sm" variant="ghost" icon={X} onClick={() => reject(user)}>Reject</Button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : <EmptyState title="No pending requests" description="New signup requests will appear here for admin approval." />}
        </div>

        <div>
          <div className="section-head">
            <h3>Approved users</h3>
            <span className="muted-copy">{users.length} active</span>
          </div>
          {users.length ? (
            <div className="admin-user-list">
              {users.map((user) => (
                <article className="admin-user-card" key={user.id}>
                  <div className="admin-user-main">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                    <small>{user.department || "No department"}</small>
                    <Badge tone="blue">{user.role}</Badge>
                  </div>
                  <div className="assignment-grid approved-grid">
                    <AssignmentField label="Project">
                      {renderProjectSelect(userProjects[user.id] || "", (event) => {
                        setUserProjects((current) => ({ ...current, [user.id]: event.target.value }));
                        setUserTeams((current) => ({ ...current, [user.id]: "" }));
                      })}
                    </AssignmentField>
                    <AssignmentField label="Project manager">
                      {user.role === ROLES.PROJECT_MANAGER ? <span className="readonly-pill">This user</span> : (
                        <select className="field" value={userManagers[user.id] || ""} onChange={(event) => setUserManagers((current) => ({ ...current, [user.id]: event.target.value }))}>
                          <option value="">Select manager</option>
                          {projectManagers.map((manager) => <option key={manager.id} value={manager.id}>{manager.name}</option>)}
                        </select>
                      )}
                    </AssignmentField>
                    <AssignmentField label="Team">
                      <select className="field" value={userTeams[user.id] ?? user.teamIds?.[0] ?? ""} onChange={(event) => setUserTeams((current) => ({ ...current, [user.id]: event.target.value }))}>
                        <option value="">Auto-create/use manager team</option>
                        {teamOptions(userProjects[user.id] || "").map((team) => <option key={team.id} value={team.id}>{team.label}</option>)}
                      </select>
                    </AssignmentField>
                    <AssignmentField label="Role control">
                      <select className="field" value={user.role} onChange={(event) => updateUser(user.id, { role: event.target.value })}>
                        {(user.role === ROLES.ADMIN ? [ROLES.ADMIN, ...assignableRoles] : assignableRoles).map((role) => <option key={role}>{role}</option>)}
                      </select>
                    </AssignmentField>
                  </div>
                  <div className="admin-card-actions">
                    <Button size="sm" loading={savingTeam === user.id} disabled={user.role !== ROLES.PROJECT_MANAGER && !(userTeams[user.id] || userManagers[user.id])} onClick={() => assignApprovedUser(user)}>Save team</Button>
                  </div>
                </article>
              ))}
            </div>
          ) : <EmptyState title="No approved users" description="Approved users will appear after admin accepts registration requests." />}
        </div>
      </section>
    </>
  );
}
