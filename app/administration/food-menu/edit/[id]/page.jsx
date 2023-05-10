import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import EditFood from "@/app/administration/food-menu/edit/[id]/EditFood";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

const updateFood = async values => {
  'use server';

  const food = {
    description: values.description,
    name: values.food_name,
    type: values.type.type
  };

  const menu = {
    time: values.time
  }

  try {
    await prisma.$transaction([
      prisma.food.update({data: food, where: {foodID: values.foodID}}),
      prisma.menu.update({data: menu, where: {menuID: values.menuID}})
    ]);
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  revalidatePath('/administration/food-menu');
  return {ok: true};
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
  const menu = await prisma.view_menu_food_alergen.findFirst({where: {campID: parseInt(process.env.CAMP_ID), foodID: parseInt(id)}});
  return menu ? reparseJson(menu) : null;
};

const getAllergens = async () => {
  let allergens = await prisma.alergen.findMany();
  allergens = allergens.map(allergen => ({...allergen, label: allergen.name}));
  return reparseJson(allergens);
};
