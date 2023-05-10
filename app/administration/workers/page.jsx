import prisma from "@/lib/prisma";
import {isUserAdmin, reparseJson} from "@/lib/base";
import Workers from "@/app/administration/workers/Workers";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const removeWorker = async values => {
  'use server';

  try {
    await prisma.$transaction([
      prisma.worker.delete({where: {workerID: values.workerID}}),
      prisma.profile.delete({where: {profileID: values.profileID}})
    ]);
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function WorkerPage() {
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

  const workersData = await getWorkersData();

  return (
    <>
      <Workers
        workersData={workersData}
        removeWorker={removeWorker}
      />
    </>
  );
}

const getWorkersData = async () => {
  const workers = await prisma.view_worker_job_profile.findMany({where: {campID: parseInt(process.env.CAMP_ID)}});
  return reparseJson(workers);
};
