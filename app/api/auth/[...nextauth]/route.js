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
        login: {label: "Login", type: "text"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const {login: name, password} = credentials;

        if (!name || !password) {
          throw new Error("Missing username or password");
        }

        const user = await prisma.login.findUnique({where: {name}});

        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        return user;
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.role = user.role;
        token.id = user.loginID;
      }

      return token;
    },
    async session({session, token}) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }

      return session;
    }
  },
  pages: {
    signIn: "/sign-in",
    signOut: '/sign-out'
  },
  session: {strategy: "jwt"},
  adapter: PrismaAdapter(prisma)
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
