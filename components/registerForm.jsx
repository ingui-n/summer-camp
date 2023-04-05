'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import axios from "axios";
import {signIn} from "next-auth/react";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password") || undefined], "Passwords must match")
});


export default function RegisterForm() {
  const submitForm = async ({email, password}, bag) => {
    bag.resetForm(initialValues);
    bag.setFieldValue('email', email);

    const res = await axios.post('/api/auth', {email, password});

    if (res.status === 201) {
      const {ok, status} = await signIn("credentials", {email, password, redirect: false});

      if (ok) {
        router.push("/");
      } else {
        //todo errors with status
      }
    } else {
      //todo errors with status
    }
  };

  const router = useRouter();
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
        <TextField
          name='email'
          type='email'
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
        <TextField
          name='confirmPassword'
          type='password'
          label='Retype password'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button type='submit'>Register</Button>
      </form>
    </>
  );
}
