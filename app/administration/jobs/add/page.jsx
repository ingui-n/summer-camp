import prisma from "@/lib/prisma";
import EditJob from "@/app/administration/jobs/edit/[id]/EditJob";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {isUserAdmin} from "@/lib/base";
import {redirect} from "next/navigation";

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
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

  return (
    <>
      <EditJob
        addJob={addJob}
      />
    </>
  );
}
