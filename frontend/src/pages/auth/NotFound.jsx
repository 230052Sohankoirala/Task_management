import { Link } from "react-router-dom";
import { Button } from "../../components/common/Button";

export default function NotFound() {
  return <section className="center-page"><h1>Page not found</h1><p>The route you requested does not exist.</p><Link to="/"><Button>Go to dashboard</Button></Link></section>;
}
