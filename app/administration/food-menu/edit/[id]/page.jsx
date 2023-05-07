import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import EditFood from "@/app/administration/food-menu/edit/[id]/EditFood";
import {redirect} from "next/navigation";

const updateFood = async values => {
  'use server';

  const food = {
    description: values.description,
    name: values.food_name,
    type: values.type
  };

  const menu = {
    time: values.time
  }

  try {
    await prisma.food.update({data: food, where: {foodID: values.foodID}});
    await prisma.menu.update({data: menu, where: {menuID: values.menuID}});
  } catch (e) {
    return false;
  }

  return true;
};

export default async function Page({params}) {
  const food = await getFood(params.id);
  const allergens = await getAllergens();

  if (!food) {
    redirect('/administration/food-menu');
    return;
  }

  food.allergen = allergens.find(({number}) =>  food.number === number);

  return (
    <>
      <EditFood
        foodData={food}
        allergensData={allergens}
        updateFood={updateFood}
      />
    </>
  );
}

const getFood = async (id) => {
  const menu = await prisma.view_menu_food_alergen.findFirst({where: {campID: 2, foodID: parseInt(id)}});
  return menu ? reparseJson(menu) : null;
};

const getAllergens = async () => {
  let allergens = await prisma.alergen.findMany();
  allergens = allergens.map(allergen => ({...allergen, label: allergen.name}));
  return reparseJson(allergens);
};
