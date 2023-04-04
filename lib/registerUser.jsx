import {signIn} from "next-auth/react";
import {hash} from "bcrypt";

const registerUser = async (email, password) => {
  const exists = await prisma.user.findUnique({where: {email}});

  if (!exists) {
    await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10)
      },
    });

    const {ok, status} = await signIn("credentials", {email, password, redirect: false});

    return {ok, status};
  }

  return {ok: false, status: 409};
};

export default registerUser;
