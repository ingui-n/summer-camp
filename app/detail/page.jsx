import prisma from "@/lib/prisma";
import Detail from "@/app/detail/Detail";
import {reparseJson} from "@/lib/base";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";


export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in?ref=/detail');
  }

  const campData = await getCampData();
  const programData = await getProgramData();
  const menuData = await getMenuData();
  const isRegistered = await isUserRegistered(session.user.id);

  return (
    <>
      <Detail
        campData={campData}
        programData={programData}
        menuData={menuData}
        isUserRegistered={isRegistered}
      />
    </>
  );
}

const getCampData = async () => {
  const camp = await prisma.camp.findUnique({where: {campID: parseInt(process.env.CAMP_ID)}});
  return reparseJson(camp);
};

const getProgramData = async () => {
  const program = await prisma.program.findMany({where: {campID: parseInt(process.env.CAMP_ID)}});
  return reparseJson(program);
};

const getMenuData = async () => {
  const menu = await prisma.view_menu_food_alergen.findMany({where: {campID: parseInt(process.env.CAMP_ID)}});
  return reparseJson(menu);
};

const isUserRegistered = async loginID => {
  const user = await prisma.user.findFirst({where: {loginID: loginID}});
  return Boolean(user);
};

