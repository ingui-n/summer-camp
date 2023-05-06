'use client';

import {Button, InputAdornment, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {useRef, useState} from "react";
import Link from "next/link";
import {signInCredentials} from "@/lib/base";
import {signUpValidationSchema} from "@/lib/validationSchemas";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const initialValues = {
  name: '',
  email: '',
  password: ''
};


export default function SignUpForm({searchParams, createUser}) {
  const router = useRouter();
  const errorP = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async ({name, email, password}, bag) => {
    bag.resetForm(initialValues);
    bag.setFieldValue('name', name);
    bag.setFieldValue('email', email);

    const {ok: userCreated, err} = await createUser(name, email, password);

    if (!userCreated) {
      errorP.current.textContent = err;
      return;
    }

    const {error} = await signInCredentials(name, password);

    if (!error) {
      router.push(searchParams.ref || '/');
    } else {
      errorP.current.textContent = error;
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: submitForm
  });

  return (
    <>
      <div className="message">
        <h2>Registrace</h2>
      </div>
      <p>Vyplňte prosím následující:</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="content">
          <TextField
            name='name'
            type='text'
            label='Login'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            type={showPassword ? 'text' : 'password'}
            label="Heslo"
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
          <Button type='submit' variant="contained">Registrovat se</Button>
        </div>
      </form>
    </>
  );
}
