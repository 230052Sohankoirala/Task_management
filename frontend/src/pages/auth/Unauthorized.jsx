import { Link } from "react-router-dom";
import { Button } from "../../components/common/Button";

export default function Unauthorized() {
  return <section className="center-page"><h1>Unauthorized</h1><p>Your current role cannot access this page.</p><Link to="/"><Button>Return home</Button></Link></section>;
}
