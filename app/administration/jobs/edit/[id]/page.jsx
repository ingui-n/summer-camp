import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import {redirect} from "next/navigation";
import EditJob from "@/app/administration/jobs/edit/[id]/EditJob";

const updateJob = async values => {
  'use server';

  const job = {
    description: values.description,
    type: parseInt(values.type)
  };

  try {
    await prisma.job.update({data: job, where: {jobID: values.jobID}});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function Page({params}) {
  const job = await getJob(params.id);

  if (!job) {
    redirect('/administration/jobs');
    return;
  }

  return (
    <>
      <EditJob
        jobData={job}
        updateJob={updateJob}
      />
    </>
  );
}

const getJob = async (id) => {
  const job = await prisma.job.findFirst({where: {jobID: parseInt(id)}});
  return reparseJson(job);
};
