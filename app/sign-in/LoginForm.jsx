'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useRef} from "react";
import Link from "next/link";

const initialValues = {
  login: "",
  password: ""
};

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .required("Required"),
  password: Yup.string()
    .required("Required")
});


export default function LoginForm({searchParams}) {
  const router = useRouter();
  const errorP = useRef(null);

  const submitForm = async ({login, password}, bag) => {
    bag.resetForm(initialValues);
    bag.setFieldValue('login', login);

    const {ok, status} = await signIn("credentials", {login, password, redirect: false});

    if (ok) {
      router.push(searchParams.ref || '/');
    } else {
      errorP.current.textContent = status;
    }
  };

  const formik = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: submitForm,
    }
  );

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
          <div className='login-register'>
            <p>Nemáte účet?</p>
            <Link href='/sign-up'>
              <Button variant="outlined">Registrovat se</Button>
            </Link>
          </div>
          <Button type='submit' variant="contained">Přihlásit se</Button>
        </div>
      </form>
    </>
  );
}
