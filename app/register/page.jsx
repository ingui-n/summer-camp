import RegisterForm from "@/app/register/RegisterForm";
import { Prisma } from "@prisma/client";

const register = async values => {
  'use server';

  const data = [
    values.parentBirthdate,
    values.parentEmail,
    values.parentFirstname,
    values.parentSurname,
    values.parentPhone.replaceAll(' ', ''),
    values.parentPin.replace('/', ''),
    values.parentCity,
    values.parentStreet,
    values.parentZip.replace(' ', ''),
    values.childBirthdate,
    values.childFirstname,
    values.childSurname,
    values.childPhone.replaceAll(' ', ''),
    values.childPin.replace('/', ''),
    values.loginID,
    parseInt(process.env.CAMP_ID)
  ];

  try {
    await prisma.$queryRaw`CALL pr_form_camp(${Prisma.join(data)})`;
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function RegisterPage() {
  return (
    <>
      <RegisterForm register={register}/>
    </>
  );
}
