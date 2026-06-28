import { useContext, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { EmptyState } from "../../components/common/State";
import { PageHeader } from "../../components/layout/PageHeader";
import { TeamCard } from "../../components/teams/TeamCard";
import { TeamForm } from "../../components/teams/TeamForm";
import { TeamContext } from "../../contexts/TeamContext";

export default function Teams() {
  const { teams } = useContext(TeamContext);
  const [creating, setCreating] = useState(false);

  return (
    <>
      <PageHeader title="Teams" description="Organize members by delivery focus." action={<Button icon={Plus} onClick={() => setCreating(true)}>New team</Button>} />
      {teams.length ? <div className="project-grid">{teams.map((team) => <TeamCard key={team.id} team={team} />)}</div> : <EmptyState title="No teams yet" description="Create members first, then organize them into teams." />}
      <Modal open={creating} title="Create team" onClose={() => setCreating(false)}><TeamForm onSaved={() => setCreating(false)} /></Modal>
    </>
  );
}
