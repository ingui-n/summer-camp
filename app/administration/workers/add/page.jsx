import prisma from "@/lib/prisma";
import {isUserAdmin, reparseJson} from "@/lib/base";
import EditWorker from "@/app/administration/workers/edit/[id]/EditWorker";
import {Prisma} from "@prisma/client";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const addWorker = async values => {
  'use server';

  const data = [
    values.email,
    values.firstname,
    values.surname,
    values.phone.replaceAll(' ', ''),
    values.title,
    values.jobType.jobID,
    parseInt(process.env.CAMP_ID),
    values.loginID || 0,
    //values.profileID || 0,
  ];

  const profile = {
    upload_date: values.profileUploadDate,
    type: values.profileImageType,
    image: Buffer.from(values.profileImage),
  };

  try {
    await prisma.$transaction(async prisma => {
      const newProfile = await prisma.profile.create({data: profile});
      data.push(newProfile.profileID);

      await prisma.$queryRaw`CALL pr_worker_job(${Prisma.join(data)})`;
    });
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

  const jobs = await getJobsData();

  return (
    <>
      <EditWorker
        jobsData={jobs}
        addWorker={addWorker}
      />
    </>
  );
}

const getJobsData = async () => {
  const jobs = await prisma.job.findMany();
  return reparseJson(jobs);
};
