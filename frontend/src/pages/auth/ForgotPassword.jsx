import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Form";

export default function ForgotPassword() {
  return <form className="auth-card" onSubmit={(event) => { event.preventDefault(); toast.success("Reset link sent"); }}><h2>Forgot password</h2><label>Email<Input type="email" defaultValue="avery@flowdesk.dev" /></label><Button>Send reset link</Button><p><Link to="/login">Back to login</Link></p></form>;
}
