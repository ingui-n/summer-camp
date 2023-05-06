import {signIn} from "next-auth/react";

const reparseJson = json => {
  return JSON.parse(JSON.stringify(json));
};

const signInCredentials = async (login, password) => {
  return signIn("credentials", {
    login,
    password,
    redirect: false
  });
};

const validateWithSchema = async (schema, values) => {
  let res = {ok: false, err: null};

  try {
    await schema.validate(values);
    res.ok = true;
  } catch ({message}) {
    res.err = message;
  }

  return res;
}

export {reparseJson, signInCredentials, validateWithSchema};
