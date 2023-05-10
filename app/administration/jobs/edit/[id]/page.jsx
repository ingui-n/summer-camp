import prisma from "@/lib/prisma";
import {isUserAdmin, reparseJson} from "@/lib/base";
import {redirect} from "next/navigation";
import EditJob from "@/app/administration/jobs/edit/[id]/EditJob";
import {revalidatePath} from "next/cache";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

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

  revalidatePath('/administration/jobs');
  return {ok: true};
};

export default async function Page({params}) {
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

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
