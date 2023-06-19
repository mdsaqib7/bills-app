import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);

export default SignUpPage;
