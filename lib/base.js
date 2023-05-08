import {signIn} from "next-auth/react";

const reparseJson = json => {
  return JSON.parse(JSON.stringify(json));
};

const signInCredentials = async (name, password) => {
  return await signIn("credentials", {name, password, redirect: false});
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
};

const isUserAdmin = user => {
  return user.role === 3;
};

export {reparseJson, signInCredentials, validateWithSchema, isUserAdmin};
