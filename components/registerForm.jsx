'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import axios from "axios";
import {signIn} from "next-auth/react";
import {useRef} from "react";

const initialValues = {
  login: '',
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters long")
});


export default function RegisterForm() {
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
          router.push("/");
        } else {
          //todo errors with status
        }
      })
      .catch(err => {
        errorP.current.textContent = err.response.data.error;
      });
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
        <Button variant="outlined" onClick={redirect}>Cancel</Button>
        <Button type='submit' variant="contained">Register</Button>
      </div>
    </form>
  );
}
