import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import {redirect} from "next/navigation";
import EditAllergen from "@/app/administration/allergens/edit/[id]/EditAllergen";

const updateAllergen = async values => {
  'use server';

  const allergen = {
    name: values.name,
    number: values.number
  };

  try {
    await prisma.alergen.update({data: allergen, where: {alergenID: values.alergenID}});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function Page({params}) {
  const allergen = await getAllergen(params.id);

  if (!allergen) {
    redirect('/administration/allergens');
    return;
  }

  return (
    <>
      <EditAllergen
        allergenData={allergen}
        updateAllergen={updateAllergen}
      />
    </>
  );
}

const getAllergen = async (id) => {
  const allergen = await prisma.alergen.findFirst({where: {alergenID: parseInt(id)}});
  return reparseJson(allergen);
};
