import RegisterForm from "@/app/sign-up/RegisterForm";

export default function RegisterPage({searchParams}) {
  return (
    <>
      <RegisterForm searchParams={searchParams}/>
    </>
  );
}
