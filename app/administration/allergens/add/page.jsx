import prisma from "@/lib/prisma";
import EditAllergen from "@/app/administration/allergens/edit/[id]/EditAllergen";

const addAllergen = async values => {
  'use server';

  const allergen = {
    name: values.name,
    number: values.number
  };

  try {
    await prisma.alergen.create({data: allergen});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function Page() {
  return (
    <>
      <EditAllergen
        addAllergen={addAllergen}
      />
    </>
  );
}
