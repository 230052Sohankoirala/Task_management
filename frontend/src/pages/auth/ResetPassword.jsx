import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Form";

export default function ResetPassword() {
  return <form className="auth-card" onSubmit={(event) => { event.preventDefault(); toast.success("Password changed"); }}><h2>Reset password</h2><label>New password<Input type="password" /></label><label>Confirm password<Input type="password" /></label><Button>Reset password</Button><p><Link to="/login">Back to login</Link></p></form>;
}
