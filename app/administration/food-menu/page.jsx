import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import Foods from "@/app/administration/food-menu/Foods";

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

export default async function FoodPage() {
  const menuData = await getMenuData();

  return (
    <>
      <Foods
        menuData={menuData}
        removeFood={removeFood}
      />
    </>
  );
}

const getMenuData = async () => {
  const menu = await prisma.view_menu_food_alergen.findMany({where: {campID: parseInt(process.env.CAMP_ID)}});
  return reparseJson(menu);
};