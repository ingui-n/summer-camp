import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import FoodMenu from "@/app/administration/food-menu/FoodMenu";

export default async function Page() {
  const menuData = await getMenuData();

  return (
    <>
      <FoodMenu menuData={menuData} />
    </>
  );
}

const getMenuData = async () => {
  const menu = await prisma.$queryRaw`SELECT * FROM view_menu_food_alergen`;
  return reparseJson(menu);
};