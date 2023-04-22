import prisma from "@/lib/prisma";
import Detail from "@/app/detail/detail";
import {reparseJson} from "@/lib/base";


export default async function Page() {
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
  const camp = await prisma.camp.findUnique({where: {campID: 1}});
  return reparseJson(camp);
};

const getProgramData = async () => {
  const program = await prisma.program.findMany({where: {campID: 1}});
  return reparseJson(program);
};

const getMenuData = async () => {
  const menu = await prisma.menu.findFirst({where: {campID: 1}});

  if (menu) {
    let foods = await prisma.food.findMany({where: {menuID: menu.menuID}});

    for (const food of foods) {
      food.alergen = await prisma.alergen.findUnique({where: {number: food.alergenID}});
    }

    return reparseJson(foods);
  }

  return null;
};

