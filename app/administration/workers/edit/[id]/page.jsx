import prisma from "@/lib/prisma";
import {isUserAdmin, reparseJson} from "@/lib/base";
import {redirect} from "next/navigation";
import EditWorker from "@/app/administration/workers/edit/[id]/EditWorker";
import {revalidatePath} from "next/cache";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const updateWorker = async values => {
  'use server';

  const worker = {
    email: values.email,
    first_name: values.firstname,
    last_name: values.surname,
    phone_number: values.phone.replaceAll(' ', ''),
    title: values.title,
    jobID: values.jobType.jobID,
  };

  const profile = {
    upload_date: values.profileUploadDate,
    type: values.profileImageType,
    image: Buffer.from(values.profileImage),
  };

  try {
    await prisma.$transaction([
      prisma.worker.update({data: worker, where: {workerID: values.workerID}}),
      prisma.profile.update({data: profile, where: {profileID: values.profileID}}),
    ]);
  } catch (err) {
    console.log(err)
    return {ok: false, err: 'meta.message'};
  }

  revalidatePath('/administration/workers');
  return {ok: true};
};

export default async function Page({params}) {
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

  const workers = await getWorker(params.id);
  const jobs = await getJobsData();

  if (!workers) {
    redirect('/administration/workers');
    return;
  }

  return (
    <>
      <EditWorker
        workerData={workers}
        jobsData={jobs}
        updateWorker={updateWorker}
      />
    </>
  );
}

const getWorker = async id => {
  const worker = await prisma.view_worker_job_profile.findFirst({
    where: {campID: parseInt(process.env.CAMP_ID), workerID: parseInt(id)}
  });
  return reparseJson(worker);
};

const getJobsData = async () => {
  const jobs = await prisma.job.findMany();
  return reparseJson(jobs);
};
