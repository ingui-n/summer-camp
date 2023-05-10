import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import {redirect} from "next/navigation";
import EditProgram from "@/app/administration/program/edit/[id]/EditProgram";
import {revalidatePath} from "next/cache";

const updateProgram = async values => {
  'use server';

  const program = {
    name: values.name,
    description: values.description,
    from: values.from,
    to: values.to
  };

  try {
    await prisma.program.update({data: program, where: {programID: values.programID}});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  revalidatePath('/administration/program');
  return {ok: true};
};

export default async function Page({params}) {
  const program = await getProgram(params.id);

  if (!program) {
    redirect('/administration/program');
    return;
  }

  return (
    <>
      <EditProgram
        programData={program}
        updateProgram={updateProgram}
      />
    </>
  );
}

const getProgram = async id => {
  const program = await prisma.program.findFirst({where: {programID: parseInt(id)}});
  return reparseJson(program);
};
