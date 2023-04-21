import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {compare} from "bcrypt";
import prisma from "@/lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: {label: "Login"},
        username: {label: "Login"},//todo name = undefined
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const {login, password} = credentials;

        if (!login || !password) {
          throw new Error("Missing username or password");
        }

        const user = await prisma.login.findUnique({where: {login}});

        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        console.log(user)
        return user;
      }
    })
  ],
  callbacks: {
    jwt: async (all) => {
      console.log(all.token.user)//todo
      // user && (token.user = user);
      return all;
    },
    session: async (all) => {
      // console.log(all)
      // session.user = token.user;  // Setting token in session
      return all;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {strategy: "jwt"},
  adapter: PrismaAdapter(prisma)
};

export default NextAuth(authOptions);
