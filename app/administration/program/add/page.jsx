import prisma from "@/lib/prisma";
import EditProgram from "@/app/administration/program/edit/[id]/EditProgram";

const addProgram = async values => {
  'use server';

  const program = {
    name: values.name,
    description: values.description,
    from: values.from,
    to: values.to,
    campID: parseInt(process.env.CAMP_ID)
  };

  try {
    await prisma.program.create({data: program});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function Page() {
  return (
    <>
      <EditProgram
        addProgram={addProgram}
      />
    </>
  );
}
