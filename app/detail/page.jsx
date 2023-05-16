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
  const registration = await getUserRegistration(session.user.id);

  return (
    <>
      <Detail
        campData={campData}
        programData={programData}
        menuData={menuData}
        registration={registration}
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

const getUserRegistration = async loginID => {
  const user = await prisma.user.findFirst({where: {loginID: loginID}});

  if (user) {
    const registration = await prisma.registration.findFirst({where: {userID: user.userID}});
    return reparseJson(registration);
  }

  return null;
};

