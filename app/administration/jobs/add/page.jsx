import prisma from "@/lib/prisma";
import EditJob from "@/app/administration/jobs/edit/[id]/EditJob";

const addJob = async values => {
  'use server';

  const job = {
    description: values.description,
    type: parseInt(values.type)
  };

  try {
    await prisma.job.create({data: job});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function Page() {
  return (
    <>
      <EditJob
        addJob={addJob}
      />
    </>
  );
}
