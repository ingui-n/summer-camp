'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {jobValidationSchema} from "@/lib/validationSchemas";
import Link from "next/link";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";

const initialValues = {
  description: "",
  type: "",
};


export default function EditJob({jobData = initialValues, updateJob, addJob}) {
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();

  const submitForm = async ({...values}) => {
    let res;

    if (addJob instanceof Function) {
      res = await addJob(values);
    } else {
      res = await updateJob(values);
    }

    if (res.ok) {
      enqueueSnackbar('Položka uložena', {variant: 'success'});
      if (addJob instanceof Function)
        router.push('/administration/jobs');
    } else {
      enqueueSnackbar(`Nelze uložit: ${res.err}`, {variant: 'error'});
    }
  };

  const formik = useFormik(
    {
      initialValues: jobData,
      validationSchema: jobValidationSchema,
      onSubmit: submitForm,
    }
  );

  return (
    <>
      <div className='content'>
        <h2>Pracovní pozice</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='content form-inputs'>
            <TextField
              name='description'
              type='text'
              label='Název pracovní pozice'
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              name='type'
              type='text'
              label='Typ pracovní pozice'
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            />
          </div>
          <div className='form-buttons'>
            <Link href='/administration/jobs'>
              <Button variant="outlined">Zpět</Button>
            </Link>
            <Button type='submit' variant="contained">Uložit</Button>
          </div>
        </form>
      </div>
    </>
  );
}
