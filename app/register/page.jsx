import RegisterForm from "@/app/register/RegisterForm";

export default function RegisterPage({searchParams}) {
  return (
    <>
      <RegisterForm searchParams={searchParams}/>
    </>
  );
}
