import { Link, useLocation } from "react-router-dom";

export function Breadcrumbs() {
  const parts = useLocation().pathname.split("/").filter(Boolean);
  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {parts.map((part, index) => (
        <Link key={part + index} to={`/${parts.slice(0, index + 1).join("/")}`}>{part.replaceAll("-", " ")}</Link>
      ))}
    </nav>
  );
}
