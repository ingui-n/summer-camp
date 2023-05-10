import prisma from "@/lib/prisma";
import {isUserAdmin, reparseJson} from "@/lib/base";
import {redirect} from "next/navigation";
import EditApplication from "@/app/administration/applications/edit/[id]/EditApplication";
import {revalidatePath} from "next/cache";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const updateApplication = async values => {
  'use server';

  const user = {
    birthdate: values.childBirthdate,
    first_name: values.childFirstname,
    last_name: values.childSurname,
    phone: values.childPhone.replaceAll(' ', ''),
    pin: values.childPin.replace('/', ''),
  };

  const representative = {
    zip: values.parentZip.replace(' ', ''),
    city: values.parentCity,
    address: values.parentStreet,
    birthdate: values.parentBirthdate,
    email: values.parentEmail,
    first_name: values.parentFirstname,
    last_name: values.parentSurname,
    phone: values.parentPhone.replaceAll(' ', ''),
    pin: values.parentPin.replace('/', ''),
  };

  const registration = {
    is_paid: values.isPaid
  };

  try {
    await prisma.$transaction([
      prisma.registration.update({data: registration, where: {registrationID: values.registrationID}}),
      prisma.user.update({data: user, where: {userID: values.userID}}),
      prisma.legal_representative.update({data: representative, where: {legal_representativeID: values.legal_representativeID}}),
    ]);
  } catch ({meta}) {
    return {ok: false, err: meta.message};
  }

  revalidatePath('/administration/applications');
  return {ok: true};
};

export default async function Page({params}) {
  const session = await getServerSession(authOptions);

  if (!isUserAdmin(session.user)) {
    redirect('/administration');
  }

  const application = await getApplicationData(params.id);

  if (!application) {
    redirect('/administration/applications');
    return;
  }

  return (
    <>
      <EditApplication
        applicationData={application}
        updateApplication={updateApplication}
      />
    </>
  );
}

const getApplicationData = async id => {
  const application = await prisma.view_user_representative_login_registration.findFirst({
    where: {registrationID: parseInt(id)}
  });
  return reparseJson(application);
};
