import RegisterForm from "@/app/register/RegisterForm";

export default function RegisterPage() {
  const test = async () => {
    'use server';

    const menu = await prisma.menu.findFirst({where: {campID: 2}});
    console.log(menu);

    return menu;
  };

  return (
    <>
      <RegisterForm test={test}/>
    </>
  );
}
