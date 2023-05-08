import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import {redirect} from "next/navigation";
import EditLogin from "@/app/administration/logins/edit/[id]/EditLogin";
import {hash} from "bcrypt";

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

  return {ok: true};
};

export default async function Page({params}) {
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
