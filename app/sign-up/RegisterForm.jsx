'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import axios from "axios";
import {signIn} from "next-auth/react";
import {useRef} from "react";
import Link from "next/link";

const initialValues = {
  login: '',
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .min(3, 'Name is too short')
    .max(20, 'Name is too large')
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters long")
    .max(100, 'Password is too long')
});


export default function RegisterForm({searchParams}) {
  const router = useRouter();
  const errorP = useRef(null);

  const submitForm = async ({login, email, password}, bag) => {
    bag.resetForm(initialValues);
    bag.setFieldValue('login', login);
    bag.setFieldValue('email', email);

    axios.post('/api/auth', {login, email, password})
      .then(async () => {
        const {ok, status} = await signIn("credentials", {
          login,
          password,
          redirect: false
        });

        if (ok) {
          router.push(searchParams.ref || '/');
        } else {
          errorP.current.textContent = status;
        }
      })
      .catch(err => {
        errorP.current.textContent = err.response.data.error;
      });
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
      <form onSubmit={formik.handleSubmit}>
        <div className="message">
          <h2>Registration Form</h2>
        </div>
        <p>Please fill out the following details:</p>
        <div className="content">
          <TextField
            name='login'
            type='text'
            label='Login'
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            name='email'
            type='text'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name='password'
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
            <p>Již jste se zaregistrovali?</p>
            <Link href='/sign-in'>
              <Button variant="outlined">Přihlásit se</Button>
            </Link>
          </div>
          <Button type='submit' variant="contained">Register</Button>
        </div>
      </form>
    </>
  );
}
