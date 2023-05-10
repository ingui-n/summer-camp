import prisma from "@/lib/prisma";
import {isUserAdmin, reparseJson} from "@/lib/base";
import Jobs from "@/app/administration/jobs/Jobs";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const removeJob = async values => {
  'use server';

  try {
    await prisma.job.delete({where: {jobID: values.jobID}});
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function JobsPage() {
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

  const jobsData = await getJobsData();

  return (
    <>
      <Jobs
        jobsData={jobsData}
        removeJob={removeJob}
      />
    </>
  );
}

const getJobsData = async () => {
  const jobs = await prisma.job.findMany();
  return reparseJson(jobs);
};
