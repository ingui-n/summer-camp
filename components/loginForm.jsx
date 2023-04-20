'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useRef} from "react";

const initialValues = {
  login: "",
  password: ""
};

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .required("Required"),//todo
  password: Yup.string()
    .required("Required")
});


export default function LoginForm() {
  const submitForm = async ({login, password}, bag) => {
    bag.resetForm(initialValues);
    bag.setFieldValue('login', login);

    const {ok, status} = await signIn("credentials", {login, password, redirect: false});

    if (ok) {
      router.push("/");
    } else {
      errorP.current.innerText = "Login nebo heslo nesprávné!";
      //todo errors with status
    }
  };

  const redirect = () => {
    router.push("/");
  };

  const router = useRouter();
  const formik = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: submitForm,
    }
  );
  const errorP = useRef(null);

  return (
    <>
      <div className="message">
        <h2>Přihlášení</h2>
      </div>
      <p>Prosím vložte svůj email a heslo!</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="content">
          <TextField
            name="login"
            type='text'
            label='Login'
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            name="password"
            type='password'
            label='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <p className='message-error' ref={errorP}></p>
        <div className="buttons">
          <Button variant="outlined" onClick={redirect}>Zpět</Button>
          <Button type='submit' variant="contained">Přihlásit se</Button>
        </div>
      </form>
    </>
  );
}
