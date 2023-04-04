import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from '@prisma/client';
import {compare} from "bcrypt";
import {PrismaAdapter} from "@next-auth/prisma-adapter";

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const {email, password} = credentials;

        if (!email || !password) {
          throw new Error("Missing username or password");
        }

        const user = await prisma.user.findUnique({where: {email}});

        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        return user;
      }
    })
  ],
  session: {strategy: "jwt"},
  adapter: PrismaAdapter(prisma)
};

export default NextAuth(authOptions);
