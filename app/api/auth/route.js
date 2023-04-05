import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {hash} from "bcrypt";

export async function POST(request) {
  const {email, password} = await request.json();

  if (!email || !password) {
    return NextResponse.json({error: 'Missing email or password'}, {status: 400});
  }

  const prisma = new PrismaClient();

  const exists = await prisma.user.findUnique({
    where: {email}
  });

  if (exists) {
    return NextResponse.json({error: 'User already exists'}, {status: 400});
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10)
      }
    });

    return NextResponse.json(user, {status: 201});
  }
}
