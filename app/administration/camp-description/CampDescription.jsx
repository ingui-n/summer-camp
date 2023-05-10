'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {campValidationSchema} from "@/lib/validationSchemas";
import moment from "moment";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {useSnackbar} from "notistack";
import {Editor} from "@tinymce/tinymce-react";
import formatStringByPattern from "format-string-by-pattern";
import Link from "next/link";


const initialValues = {
  date_from: '',
  date_to: '',
  name: '',
  shortDescription: '',
  mainDescription: '',
  address: '',
  phone: '',
  aboutUs: '',
  email: '',
  price: ''
};


export default function CampDescription({campData = initialValues, updateCamp}) {
  const {enqueueSnackbar} = useSnackbar();

    if (typeof campData.description === 'string') {
      const parsed = JSON.parse(campData.description);

      for (let [key, value] of Object.entries(parsed)) {
        if (key === 'phone') {
          value = formatStringByPattern('000 000 000', value);
        }

        campData[key] = value;
      }
    }

  campData.date_from = moment(campData.date_from);
  campData.date_to = moment(campData.date_to);

  const submitForm = async values => {
    values.date_from = values.date_from.format();
    values.date_to = values.date_to.format();

    const s = {
      shortDescription: values.shortDescription,
      mainDescription: values.mainDescription,
      address: values.address,
      phone: values.phone,
      aboutUs: values.aboutUs,
      email: values.email,
    };

    values.description = JSON.stringify(s);

    const res = await updateCamp(values);

    if (res.ok) {
      enqueueSnackbar('Tábor uložen', {variant: 'success'});
    } else {
      enqueueSnackbar(`Nelze uložit: ${res.err}`, {variant: 'error'});
    }
  };

  const formik = useFormik(
    {
      initialValues: campData,
      validationSchema: campValidationSchema,
      onSubmit: submitForm,
    }
  );

  return (
    <>
      <div className='content'>
        <h2>Podrobnosti táboru</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='content form-inputs'>
            <TextField
              name='name'
              type='text'
              label='Název tábora'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              name='price'
              type='number'
              label='Cena'
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              name='address'
              type='text'
              label='Adresa'
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              name='phone'
              type='text'
              label='Telefon'
              value={formik.values.phone}
              onChange={event => formik.setFieldValue('phone', formatStringByPattern('000 000 000', event.target.value))}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              name='email'
              type='text'
              label='Telefon'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <DateTimePicker
              formik={formik}
              name='date_from'
              label='Začátek'
              onChange={value => formik.setFieldValue('date_from', value)}
              value={moment(formik.values.date_from)}
            />
            <DateTimePicker
              formik={formik}
              name='date_to'
              label='Konec'
              onChange={value => formik.setFieldValue('date_to', value)}
              value={moment(formik.values.date_to)}
            />
            <Link href='/camp'><h3>Text v dostupných táborech:</h3></Link>
            <Editor
              apiKey={process.env.TINY_API_KEY}
              name='shortDescription'
              textareaName='shortDescription'
              value={formik.values.shortDescription}
              onEditorChange={value => formik.setFieldValue('shortDescription', value)}
              init={{
                language: 'cs',
                toolbar_mode: 'wrap',
                branding: false,
                content_style: 'body {font-family: Helvetica, Arial, sans-serif; font-size: 14px;}'
              }}
            />
            <Link href='/detail'><h3>Text v detailu tábora:</h3></Link>
            <Editor
              apiKey={process.env.TINY_API_KEY}
              name='mainDescription'
              textareaName='mainDescription'
              value={formik.values.mainDescription}
              onEditorChange={value => formik.setFieldValue('mainDescription', value)}
              init={{
                language: 'cs',
                toolbar_mode: 'wrap',
                branding: false,
                content_style: 'body {font-family: Helvetica, Arial, sans-serif; font-size: 14px;}'
              }}
            />
            <Link href='/about'><h3>Text v sekci o nás:</h3></Link>
            <Editor
              apiKey={process.env.TINY_API_KEY}
              name='aboutUs'
              textareaName='aboutUs'
              value={formik.values.aboutUs}
              onEditorChange={value => formik.setFieldValue('aboutUs', value)}
              init={{
                language: 'cs',
                toolbar_mode: 'wrap',
                branding: false,
                content_style: 'body {font-family: Helvetica, Arial, sans-serif; font-size: 14px;}'
              }}
            />
          </div>
          <div className='form-buttons'>
            <Button type='submit' variant="contained">Uložit</Button>
          </div>
        </form>
      </div>
    </>
  );
}
