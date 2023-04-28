import LoginForm from "@/app/login/LoginForm";

export default function LoginPage({searchParams}) {
  return (
    <>
      <h2>Login form</h2>
      <LoginForm searchParams={searchParams}/>
    </>
  );
}
