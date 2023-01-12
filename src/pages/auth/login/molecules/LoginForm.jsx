import AuthContainer from "@/pages/auth/components/AuthContainer";
import { InputGroup } from "@/components/ui";
import { Button } from "@/styles/reusable/elements.styled";

const LoginForm = () => {
  return (
    <>
      <AuthContainer>
        <Button>Test</Button>
        <InputGroup placeholder="This is a text field" label="Email address" />
      </AuthContainer>
    </>
  );
};

export default LoginForm;
