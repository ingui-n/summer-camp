'use client';

import {Autocomplete, Button, InputAdornment, TextField} from "@mui/material";
import {useFormik} from "formik";
import {adminLogInValidationSchema} from "@/lib/validationSchemas";
import Link from "next/link";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {isEqual} from "lodash";
import {loginRoles} from "@/lib/configTypes";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: 0,
};


export default function EditLogin({loginData = initialValues, updateLogin, addLogin}) {
  const [showPassword, setShowPassword] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();

  if (typeof loginData.role === 'number') {
    loginData.role = loginRoles.find(({role}) => role === loginData.role) || {label: '', role: 0};
  }

  const submitForm = async ({...values}, bag) => {
    bag.setFieldValue('password', '');

    if (values.role.role === 0) {
      enqueueSnackbar(`Vyberte typ uživatele`, {variant: 'error'});
      return;
    }

    let res;

    if (addLogin instanceof Function) {
      if (values.password === '') {
        enqueueSnackbar(`Zadejte heslo`, {variant: 'error'});
        return;
      }

      res = await addLogin(values);
    } else {
      res = await updateLogin(values);
    }

    if (res.ok) {
      enqueueSnackbar('Položka uložena', {variant: 'success'});
      if (addLogin instanceof Function)
        router.push('/administration/logins');
    } else {
      enqueueSnackbar(`Nelze uložit: ${res.err}`, {variant: 'error'});
    }
  };

  const formik = useFormik(
    {
      initialValues: loginData,
      validationSchema: adminLogInValidationSchema,
      onSubmit: submitForm,
    }
  );

  return (
    <>
      <div className='content'>
        <h2>Uživatel</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='content form-inputs'>
            <TextField
              name='name'
              type='text'
              label='Název uživatele'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              name='email'
              type='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Autocomplete
              disablePortal
              isOptionEqualToValue={(option, value) => value.role !== 0 ? isEqual(option, value) : true}
              onChange={(_, value) => formik.setFieldValue('role', value)}
              name='role'
              value={formik.values.role !== 0 ? formik.values.role : null}
              options={loginRoles}
              renderInput={(params) => <TextField {...params} label="Typ uživatele"/>}
              //todo error
            />
            <TextField
              type={showPassword ? 'text' : 'password'}
              label="Heslo"
              placeholder='(prázdné znamená nezměněno)'
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
          <div className='form-buttons'>
            <Link href='/administration/logins'>
              <Button variant="outlined">Zpět</Button>
            </Link>
            <Button type='submit' variant="contained">Uložit</Button>
          </div>
        </form>
      </div>
    </>
  );
}
