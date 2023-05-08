import SignUpForm from "@/app/sign-up/SignUpForm";
import prisma from "@/lib/prisma";
import {hash} from "bcrypt";

const createUser = async (name, email, password) => {
  'use server';

  const exists = await prisma.login.findUnique({where: {name}});

  if (exists) {
    return {ok: false, err: 'Uživatel s tímto loginem již existuje'};
  }

  try {
    await prisma.login.create({
      data: {
        name,
        email,
        role: 1,
        password: await hash(password, 10)
      }
    });
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }


  return {ok: true};
};

export default function SignUpPage({searchParams}) {
  return (
    <>
      <SignUpForm
        searchParams={searchParams}
        createUser={createUser}
      />
    </>
  );
}
