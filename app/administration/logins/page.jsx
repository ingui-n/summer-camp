import prisma from "@/lib/prisma";
import {isUserAdmin, reparseJson} from "@/lib/base";
import Logins from "@/app/administration/logins/Logins";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const removeLogin = async values => {
  'use server';

  try {
    await prisma.login.delete({where: {loginID: values.loginID}});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function LoginsPage() {
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

  const loginsData = await getLoginsData();

  return (
    <>
      <Logins
        loginsData={loginsData}
        removeLogin={removeLogin}
      />
    </>
  );
}

const getLoginsData = async () => {
  const logins = await prisma.login.findMany();
  return reparseJson(logins);
};
