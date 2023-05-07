import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import FoodMenu from "@/app/administration/food-menu/FoodMenu";

const removeFood = async food => {
  'use server';

  const res = {ok: false};

  try {
    await prisma.food.delete({where: {foodID: food.foodID}});
    return {...res, ok: true};
  } catch (e) {
  }

  return res;
};

export default async function Page() {
  const menuData = await getMenuData();

  return (
    <>
      <FoodMenu
        menuData={menuData}
        removeFood={removeFood}
      />
    </>
  );
}

const getMenuData = async () => {
  const menu = await prisma.view_menu_food_alergen.findMany({where: {campID: 2}});
  return reparseJson(menu);
};