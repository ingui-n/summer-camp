import {NextResponse} from 'next/server';
import {hash} from "bcrypt";
import prisma from '@/lib/prisma';
import isEmail from 'validator/lib/isEmail';

export async function POST(request) {
  const {login: name, email, password} = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({error: 'Missing login, email or password'}, {status: 400});
  }

  if (!isEmail(email)) {
    return NextResponse.json({error: 'Invalid email'}, {status: 400});
  }

  if (typeof name !== 'string' || name.length < 3) {
    return NextResponse.json({error: 'Invalid name'}, {status: 400});
  }

  if (typeof password !== 'string' || password.length < 6) {
    return NextResponse.json({error: 'Password is too short'}, {status: 400});
  }

  const exists = await prisma.login.findUnique({where: {name}});

  if (exists) {
    return NextResponse.json({error: 'User already exists'}, {status: 400});
  } else {
    const user = await prisma.login.create({
      data: {
        name,
        email,
        role: 1,
        password: await hash(password, 10)
      }
    });

    return NextResponse.json(user, {status: 201});
  }
}
