import {NextResponse} from 'next/server';
import {hash} from "bcrypt";
import prisma from '@/lib/prisma';

export async function POST(request) {
  const {login, email, password} = await request.json();

  if (!login || !email || !password) {
    return NextResponse.json({error: 'Missing login, email or password'}, {status: 400});
  }

  const exists = await prisma.login.findUnique({where: {login}});

  if (exists) {
    return NextResponse.json({error: 'User already exists'}, {status: 400});
  } else {
    const user = await prisma.login.create({
      data: {
        login,
        email,
        function_type: 1,
        password: await hash(password, 10)
      }
    });

    return NextResponse.json(user, {status: 201});
  }
}
