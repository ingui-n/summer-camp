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
        // console.log(user)
        return user;
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      // console.log(user);
      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        token.role = user.role
        token.fullName = user.fullName
      }

      return token
    },
    async session({session, token}) {
      // console.log(token);//todo
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        session.user.role = token.role
        session.user.fullName = token.fullName
      }

      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {strategy: "jwt"},
  adapter: PrismaAdapter(prisma)
};

export default NextAuth(authOptions);
