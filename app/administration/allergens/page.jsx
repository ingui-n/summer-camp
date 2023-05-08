import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import AllergensMenu from "@/app/administration/allergens/AllergensMenu";

const removeAllergen = async values => {
  'use server';

  try {
    await prisma.alergen.delete({where: {alergenID: values.alergenID}});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function Page() {
  const allergensData = await getAllergensData();

  return (
    <>
      <AllergensMenu
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
