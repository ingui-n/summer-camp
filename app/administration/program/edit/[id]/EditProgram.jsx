'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {programValidationSchema} from "@/lib/validationSchemas";
import Link from "next/link";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import moment from "moment/moment";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";

const initialValues = {
  name: "",
  description: "",
  from: "",
  to: '',
};


export default function EditProgram({programData = initialValues, updateProgram, addProgram}) {
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();

  programData.from = moment(programData.from);
  programData.to = moment(programData.to);

  const submitForm = async ({...values}) => {
    values.from = values.from.format();
    values.to = values.to.format();

    let res;

    if (addProgram instanceof Function) {
      res = await addProgram(values);
    } else {
      res = await updateProgram(values);
    }

    if (res.ok) {
      enqueueSnackbar('Položka uložena', {variant: 'success'});
      if (addProgram instanceof Function)
        router.push('/administration/program');
    } else {
      enqueueSnackbar(`Nelze uložit: ${res.err}`, {variant: 'error'});
    }
  };

  const formik = useFormik(
    {
      initialValues: programData,
      validationSchema: programValidationSchema,
      onSubmit: submitForm,
    }
  );

  return (
    <>
      <div className='content'>
        <h2>Táborový Program</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='content form-inputs'>
            <TextField
              name='name'
              type='text'
              label='Název programu'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              name='description'
              type='text'
              label='Popis'
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <DateTimePicker
              formik={formik}
              name='from'
              label='Začátek programu'
              onChange={value => formik.setFieldValue('from', value)}
              value={moment(formik.values.from)}
              defaultValue={moment(formik.values.from)}
            />
            <DateTimePicker
              formik={formik}
              name='to'
              label='Konec programu'
              onChange={value => formik.setFieldValue('to', value)}
              value={moment(formik.values.to)}
              defaultValue={moment(formik.values.to)}
            />
          </div>
          <div className='form-buttons'>
            <Link href='/administration/program'>
              <Button variant="outlined">Zpět</Button>
            </Link>
            <Button type='submit' variant="contained">Uložit</Button>
          </div>
        </form>
      </div>
    </>
  );
}
