import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import EditFood from "@/app/administration/food-menu/edit/[id]/EditFood";

const addFood = async values => {
  'use server';

  try {
    await prisma.$queryRaw`CALL pr_menu_food(${values.allergen.alergenID}, ${process.env.CAMP_ID}, ${values.food_name}, ${values.description}, ${values.type.type}, ${values.time})`;
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function Page() {
  const allergens = await getAllergens();

  return (
    <>
      <EditFood
        allergensData={allergens}
        addFood={addFood}
      />
    </>
  );
}

const getAllergens = async () => {
  let allergens = await prisma.alergen.findMany();
  allergens = allergens.map(allergen => ({...allergen, label: allergen.name}));
  return reparseJson(allergens);
};
