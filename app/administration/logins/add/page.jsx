import prisma from "@/lib/prisma";
import EditLogin from "@/app/administration/logins/edit/[id]/EditLogin";
import {hash} from "bcrypt";

const addLogin = async values => {
  'use server';

  const login = {
    name: values.name,
    email: values.email,
    role: parseInt(values.role.role),
    password: await hash(values.password, 10)
  };

  try {
    await prisma.login.create({data: login});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function Page() {
  return (
    <>
      <EditLogin
        addLogin={addLogin}
      />
    </>
  );
}
