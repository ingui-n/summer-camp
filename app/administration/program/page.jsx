import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import Program from "@/app/administration/program/Program";

const removeProgram = async values => {
  'use server';

  try {
    await prisma.program.delete({where: {programID: values.programID}});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function ProgramPage() {
  const programData = await getProgramData();

  return (
    <>
      <Program
        programData={programData}
        removeProgram={removeProgram}
      />
    </>
  );
}

const getProgramData = async () => {
  const program = await prisma.program.findMany({where: {campID: parseInt(process.env.CAMP_ID)}});
  return reparseJson(program);
};
