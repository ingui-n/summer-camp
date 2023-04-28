import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import EditFood from "@/app/administration/food-menu/edit/[id]/EditFood";
import {redirect} from "next/navigation";

export default async function Page({params}) {
  const food = await getFood(params.id);

  if (!food) {
    redirect('/administration/food-menu');
  }

  return (
    <>
      <EditFood food={food}/>
    </>
  );
}

const getFood = async (id) => {
  const menu = await prisma.$queryRaw`SELECT *
                                      FROM view_menu_food_alergen
                                      WHERE food_ID = ${id}`;
  return menu && menu.length > 0 ? reparseJson(menu[0]) : null;
};
