import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Select } from "../../components/common/Form";
import { Tabs } from "../../components/common/Tabs";
import { EmptyState } from "../../components/common/State";
import { PageHeader } from "../../components/layout/PageHeader";
import { TeamMemberCard } from "../../components/teams/TeamMemberCard";
import { ProjectContext } from "../../contexts/ProjectContext";
import { UserContext } from "../../contexts/UserContext";
import { TeamContext } from "../../contexts/TeamContext";
import { ProjectCard } from "../../components/projects/ProjectCard";
import { useAuth } from "../../hooks/useAuth";
import { ROLES } from "../../utils/constants";

export default function TeamDetails() {
  const { id } = useParams();
  const [active, setActive] = useState("Overview");
  const [selectedUser, setSelectedUser] = useState("");
  const [adding, setAdding] = useState(false);
  const { projects } = useContext(ProjectContext);
  const { users } = useContext(UserContext);
  const { teams, addTeamMember } = useContext(TeamContext);
  const { user: currentUser } = useAuth();
  const team = teams.find((item) => item.id === id);
  if (!team) return <EmptyState title="Team not found" />;
  const members = users.filter((user) => (team.memberIds || []).includes(user.id));
  const canManageTeam = currentUser?.role === ROLES.ADMIN || (currentUser?.role === ROLES.PROJECT_MANAGER && team.leaderId === currentUser.id);
  const availableUsers = users.filter((user) => !(team.memberIds || []).includes(user.id) && user.role !== ROLES.ADMIN);

  const addMember = async () => {
    if (!selectedUser) return;
    setAdding(true);

    try {
      await addTeamMember(team.id, selectedUser);
      setSelectedUser("");
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <PageHeader title={team.name} description={team.description} />
      <Tabs tabs={["Overview", "Members", "Projects", "Activity"]} active={active} onChange={setActive} />
      {active === "Overview" && <section className="card"><p>{(team.memberIds || []).length} members and {(team.projectIds || []).length} active projects.</p></section>}
      {active === "Members" && (
        <section className="stack">
          {canManageTeam ? (
            <div className="card team-add-panel">
              <div>
                <h3>Add team member</h3>
                <p>Admins and this team's project manager can add approved users.</p>
              </div>
              <Select value={selectedUser} onChange={(event) => setSelectedUser(event.target.value)}>
                <option value="">Select user</option>
                {availableUsers.map((user) => <option key={user.id} value={user.id}>{user.name} - {user.role}</option>)}
              </Select>
              <Button icon={UserPlus} loading={adding} disabled={!selectedUser} onClick={addMember}>Add member</Button>
            </div>
          ) : null}
          <div className="member-list">{members.map((user) => <TeamMemberCard key={user.id} user={user} />)}</div>
        </section>
      )}
      {active === "Projects" && <div className="project-grid">{projects.filter((project) => (team.projectIds || []).includes(project.id)).map((project) => <ProjectCard key={project.id} project={project} />)}</div>}
      {active === "Activity" && <p className="card">Recent team activity will appear here.</p>}
    </>
  );
}
