import RegisterForm from "@/app/register/RegisterForm";

const register = async values => {
  'use server';

  try {
    await prisma.$queryRaw`CALL pr_form_camp(${values.parentBirthdate}, ${values.parentEmail}, ${values.parentFirstname}, ${values.parentSurname}, ${parseInt(values.parentPhone)}, ${values.parentPin.replace('/', '')}, ${values.parentCity}, ${values.parentStreet}, ${parseInt(values.parentZip)}, ${values.childBirthdate}, ${values.childFirstname}, ${values.childSurname}, ${parseInt(values.childPhone)}, ${values.childPin.replace('/', '')}, ${values.loginID})`;
  } catch (err) {
    return {ok: false, err}
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
