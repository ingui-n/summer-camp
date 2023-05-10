import prisma from "@/lib/prisma";
import {isUserAdmin, reparseJson} from "@/lib/base";
import {redirect} from "next/navigation";
import EditLogin from "@/app/administration/logins/edit/[id]/EditLogin";
import {hash} from "bcrypt";
import {revalidatePath} from "next/cache";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const updateLogin = async values => {
  'use server';

  const login = {
    name: values.name,
    email: values.email,
    role: parseInt(values.role.role),
  };

  if (values.password !== '') {
    login.password = await hash(values.password, 10);
  }

  try {
    await prisma.login.update({data: login, where: {loginID: values.loginID}});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  revalidatePath('/administration/logins');
  return {ok: true};
};

export default async function Page({params}) {
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

  const login = await getLogin(params.id);

  if (!login) {
    redirect('/administration/logins');
    return;
  }

  return (
    <>
      <EditLogin
        loginData={login}
        updateLogin={updateLogin}
      />
    </>
  );
}

const getLogin = async (id) => {
  const login = await prisma.login.findFirst({where: {loginID: parseInt(id)}});

  if (login)
    login.password = '';

  return reparseJson(login);
};
