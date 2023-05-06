import {getServerSession} from "next-auth/next";
import {NextResponse} from "next/server";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const POST = async () => {
  const session = getServerSession(authOptions);

  if (!session)
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});

  return NextResponse.json({sure: true}, {status: 201});
};

export {POST};
