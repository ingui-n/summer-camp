import LogInForm from "@/app/sign-in/LogInForm";

export default function LoginPage({searchParams}) {

  return (
    <>
      <LogInForm searchParams={searchParams}/>
    </>
  );
}
