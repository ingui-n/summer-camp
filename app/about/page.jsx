import About from "@/app/about/about";
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
  const camp = await prisma.camp.findUnique({where: {campID: 1}});
  return reparseJson(camp);
};
