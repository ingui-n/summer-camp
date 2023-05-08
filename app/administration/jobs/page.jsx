import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import Jobs from "@/app/administration/jobs/Jobs";

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
