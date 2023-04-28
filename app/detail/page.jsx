import prisma from "@/lib/prisma";
import Detail from "@/app/detail/Detail";
import {reparseJson} from "@/lib/base";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";


export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?ref=/detail');
  }

  const campData = await getCampData();
  const programData = await getProgramData();
  const menuData = await getMenuData();

  return (
    <>
      <Detail
        campData={campData}
        programData={programData}
        menuData={menuData}
      />
    </>
  );
}

const getCampData = async () => {
  const camp = await prisma.camp.findUnique({where: {campID: 2}});
  return reparseJson(camp);
};

const getProgramData = async () => {
  const program = await prisma.program.findMany({where: {campID: 2}});
  return reparseJson(program);
};

const getMenuData = async () => {
  const menu = await prisma.$queryRaw`SELECT * FROM view_menu_food_alergen`;

  /** showcase */
  /*const menu = await prisma.menu.findFirst({where: {campID: 2}});

  if (menu) {
    let foods = await prisma.food.findMany({where: {menuID: menu.menuID}});

    for (const food of foods) {
      food.alergen = await prisma.alergen.findUnique({where: {number: food.alergenID}});
    }

    return reparseJson(foods);
  }*/

  return reparseJson(menu);
};

