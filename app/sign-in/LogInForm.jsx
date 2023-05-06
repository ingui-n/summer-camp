'use client';

import {Button, InputAdornment, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {useRef, useState} from "react";
import Link from "next/link";
import {signInCredentials} from "@/lib/base";
import {logInvalidationSchema} from "@/lib/validationSchemas";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const initialValues = {
  name: "",
  password: ""
};


export default function LogInForm({searchParams}) {
  const router = useRouter();
  const errorP = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async ({name, password}, bag) => {
    bag.resetForm(initialValues);
    bag.setFieldValue('name', name);

    const {ok, status} = await signInCredentials(name, password);

    if (ok) {
      router.push(searchParams.ref || '/');
    } else {
      errorP.current.textContent = status;
    }
  };

  const formik = useFormik(
    {
      initialValues,
      validationSchema: logInvalidationSchema,
      onSubmit: submitForm,
    }
  );

  return (
    <>
      <div className="message">
        <h2>Přihlášení</h2>
      </div>
      <p>Vyplňte prosím následující:</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="content">
          <TextField
            name="name"
            type='text'
            label='Login'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
