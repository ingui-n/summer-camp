'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const initialValues = {
  email: "",
  password: ""
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .required("Required")
});


export default function LoginForm() {
  const submitForm = async ({email, password}, {resetForm}) => {
    resetForm(initialValues);
    const {ok, status} = await signIn("credentials", {email, password, redirect: false});

    if (ok) {
      router.push("/");
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
          name="email"
          type='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
        <Button type='submit'>Submit</Button>
      </form>
    </>
  );
}
