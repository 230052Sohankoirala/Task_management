import { PageHeader } from "../../components/layout/PageHeader";
import { teams } from "../../data/teams";
import { TeamCard } from "../../components/teams/TeamCard";

export default function Teams() {
  return <><PageHeader title="Teams" description="Organize members by delivery focus." /><div className="project-grid">{teams.map((team) => <TeamCard key={team.id} team={team} />)}</div></>;
}
