import prisma from "@/lib/prisma";
import EditLogin from "@/app/administration/logins/edit/[id]/EditLogin";
import {hash} from "bcrypt";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {isUserAdmin} from "@/lib/base";
import {redirect} from "next/navigation";

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
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

  return (
    <>
      <EditLogin
        addLogin={addLogin}
      />
    </>
  );
}
