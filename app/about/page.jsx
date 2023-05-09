import About from "@/app/about/About";
import prisma from "@/lib/prisma";
import {reparseJson} from "@/lib/base";

export default async function Page() {
  const campData = await getCampData();

  return (
    <>
      <About campData={campData} />
    </>
  );
}

const getCampData = async () => {
  const camp = await prisma.camp.findUnique({where: {campID: parseInt(process.env.CAMP_ID)}});
  return reparseJson(camp);
};
