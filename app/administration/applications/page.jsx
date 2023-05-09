import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";
import Applications from "@/app/administration/applications/Applications";

const removeApplication = async values => {
  'use server';

  try {
    await prisma.$transaction([
      prisma.registration.delete({where: {registrationID: values.registrationID}}),
      prisma.user.delete({where: {userID: values.userID}}),
      prisma.legal_representative.delete({where: {legal_representativeID: values.legal_representativeID}})
    ]);
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  return {ok: true};
};

export default async function ApplicationsPage() {
  const applicationsData = await getApplicationsData();

  return (
    <>
      <Applications
        applicationsData={applicationsData}
        removeApplication={removeApplication}
      />
    </>
  );
}

const getApplicationsData = async () => {
  const applications = await prisma.view_user_representative_login_registration.findMany(
    {where: {campID: parseInt(process.env.CAMP_ID)}}
  );
  return reparseJson(applications);
};
