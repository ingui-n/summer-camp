'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {allergenValidationSchema} from "@/lib/validationSchemas";
import Link from "next/link";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";

const initialValues = {
  name: "",
  number: "",
};


export default function EditAllergen({allergenData = initialValues, updateAllergen, addAllergen}) {
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();

  const submitForm = async ({...values}) => {
    let res;

    if (addAllergen instanceof Function) {
      res = await addAllergen(values);
    } else {
      res = await updateAllergen(values);
    }

    if (res.ok) {
      enqueueSnackbar('Položka uložena', {variant: 'success'});
      if (addAllergen instanceof Function)
        router.push('/administration/allergens');
    } else {
      enqueueSnackbar(`Nelze uložit: ${res.err}`, {variant: 'error'});
    }
  };

  const formik = useFormik(
    {
      initialValues: allergenData,
      validationSchema: allergenValidationSchema,
      onSubmit: submitForm,
    }
  );

  return (
    <>
      <div className='content'>
        <h2>Alergen</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='content form-inputs'>
            <TextField
              name='name'
              type='text'
              label='Název alergenu'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              name='number'
              type='text'
              label='Čísla alergenů'
              value={formik.values.number}
              onChange={formik.handleChange}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />
          </div>
          <div className='form-buttons'>
            <Link href='/administration/allergens'>
              <Button variant="outlined">Zpět</Button>
            </Link>
            <Button type='submit' variant="contained">Uložit</Button>
          </div>
        </form>
      </div>
    </>
  );
}
