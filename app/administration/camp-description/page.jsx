import prisma from "@/lib/prisma";
import {isUserAdmin, reparseJson} from "@/lib/base";
import CampDescription from "@/app/administration/camp-description/CampDescription";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const updateCamp = async values => {
  'use server';

  const camp = {
    date_from: values.date_from,
    date_to: values.date_to,
    description: values.description,
    name: values.name,
    price: values.price,
  };

  try {
    await prisma.camp.update({data: camp, where: {campID: values.campID}});
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

  const campData = await getCampData();

  return (
    <>
      <CampDescription
        campData={campData}
        updateCamp={updateCamp}
      />
    </>
  );
}

const getCampData = async () => {
  const camp = await prisma.camp.findFirst({where: {campID: parseInt(process.env.CAMP_ID)}});
  return reparseJson(camp);
};
