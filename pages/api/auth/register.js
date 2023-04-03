import {PrismaClient} from '@prisma/client';
import {hash} from "bcrypt";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  const {email, password} = req.body;

  const exists = await prisma.user.findUnique({
    where: {email}
  });

  if (exists) {
    res.status(400).send("User already exists");
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
      }
    });

    res.status(200).json(user);
  }
}
