import SignUpForm from "@/app/sign-up/SignUpForm";
import {validateWithSchema} from "@/lib/base";
import {signUpValidationSchema} from "@/lib/validationSchemas";
import prisma from "@/lib/prisma";
import {hash} from "bcrypt";

export default function RegisterPage({searchParams}) {
  const createUser = async (name, email, password) => {
    'use server';
    const res = {ok: false, err: null};

    const {ok: isValid, err} = await validateWithSchema(signUpValidationSchema, {name, email, password});

    if (!isValid)
      return {...res, err};

    const exists = await prisma.login.findUnique({where: {name}});

    if (exists) {
      return {...res, err: 'Uživatel s tímto loginem již existuje'};
    }

    await prisma.login.create({
      data: {
        name,
        email,
        role: 1,
        password: await hash(password, 10)
      }
    });

    return {...res, ok: true};
  };

  return (
    <>
      <SignUpForm
        searchParams={searchParams}
        createUser={createUser}
      />
    </>
  );
}
