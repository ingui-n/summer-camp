import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import Logins from "@/app/administration/logins/Logins";

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
