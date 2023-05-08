import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import Allergens from "@/app/administration/allergens/Allergens";

const removeAllergen = async values => {
  'use server';

  try {
    await prisma.alergen.delete({where: {alergenID: values.alergenID}});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function AllergensPage() {
  const allergensData = await getAllergensData();

  return (
    <>
      <Allergens
        allergensData={allergensData}
        removeAllergen={removeAllergen}
      />
    </>
  );
}

const getAllergensData = async () => {
  const allergens = await prisma.alergen.findMany();
  return reparseJson(allergens);
};
