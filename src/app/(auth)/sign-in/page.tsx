import AuthForm from "@/components/AuthForm";
import { signIn } from "@/lib/auth/actions";

export default function SignIn() {
  return <AuthForm mode="sign-in" onSubmit={signIn} />;
}
