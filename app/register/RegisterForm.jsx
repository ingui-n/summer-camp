'use client';

import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useRef} from "react";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import isEmail from 'validator/lib/isEmail';
import formatStringByPattern from 'format-string-by-pattern';
import moment from 'moment';

const initialValues = {
  childFirstname: '',
  childSurname: '',
  childBirthdate: '',
  childPhone: '',
  childPin: '',
  parentFirstname: '',
  parentSurname: '',
  parentEmail: '',
  parentPhone: '',
  parentBirthdate: '',
  parentPin: '',
  parentCity: '',
  parentStreet: '',
  parentZip: '',
};

//todo add .typeError()
const validationSchema = Yup.object().shape({
  childFirstname: Yup.string().required('Child first name is required'),
  childSurname: Yup.string().required('Child surname is required'),
  childPhone: Yup.number().required('Child phone number is required'),
  childBirthdate: Yup.string().required('Child birthdate is required'),
  childPin: Yup.string().required('Child PIN is required'),
  parentFirstname: Yup.string().required('Parent first name is required'),
  parentSurname: Yup.string().required('Parent surname is required'),
  parentEmail: Yup.string().email('Invalid email').test('validateEMail', val => isEmail(val)).required('Email is required'),
  parentPhone: Yup.number().required('Parent phone number is required'),
  parentBirthdate: Yup.date().required('Parent birthdate is required'),
  parentPin: Yup.string().required('Parent PIN is required'),
  parentCity: Yup.string().required('Parent city is required'),
  parentStreet: Yup.string().required('Parent street is required'),
  parentZip: Yup.string().required('Parent ZIP code is required'),
});


export default function RegisterForm({test}) {
  const router = useRouter();//todo
  const errorP = useRef(null);

  const submitForm = async (values) => {
    console.log(values)
    axios.post('/api/register', values)
      .then((res) => {
        console.log(res);

        /*if (ok) {
          router.push(searchParams.ref || '/');
        } else {
          errorP.current.textContent = status;
        }*/
      })
      .catch(err => {
        errorP.current.textContent = err.response.data.error;
      });
  };

  const formik = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: submitForm,
    }
  );

  return (
    <>
      <form className='auth-form' onSubmit={formik.handleSubmit}>
        <div className="message">
          <h2 onClick={() => console.log(formik.values)}>Registrační formulář</h2>
        </div>
        <p onClick={async () => {
          const menu = await test();
          console.log(menu);
        }}
        >Vyplňte prosím následující dotazník:</p>
        <div className="content">
          <h3>Část o dítěti:</h3>
          <TextField
            name='childFirstname'
            type='text'
            label='Jméno'
            value={formik.values.childFirstname}
            onChange={formik.handleChange}
            error={formik.touched.childFirstname && Boolean(formik.errors.childFirstname)}
            helperText={formik.touched.childFirstname && formik.errors.childFirstname}
          />
          <TextField
            name='childSurname'
            type='text'
            label='Příjmení'
            value={formik.values.childSurname}
            onChange={formik.handleChange}
            error={formik.touched.childSurname && Boolean(formik.errors.childSurname)}
            helperText={formik.touched.childSurname && formik.errors.childSurname}
          />
          <DatePicker
            name='childBirthdate'
            label="Datum narození"
            defaultValue={formik.values.childBirthdate}
            onChange={value => formik.setFieldValue('childBirthdate', value)}
            value={formik.values.childBirthdate}
            minDate={moment().year(moment().year() -5)}
            maxDate={moment().year(moment().year() -19)}
            slotProps={{
              textField: {
                variant: 'outlined',
                error: formik.touched.childBirthdate && Boolean(formik.errors.childBirthdate),
                helperText: formik.touched.childBirthdate && formik.errors.childBirthdate
              }
            }}
          />
          <TextField
            name='childPhone'
            type='text'
            label='Telefonní číslo'
            value={formik.values.childPhone}
            onChange={event => formik.setFieldValue('childPhone', formatStringByPattern('000 000 000', event.target.value))}
            error={formik.touched.childPhone && Boolean(formik.errors.childPhone)}
            helperText={formik.touched.childPhone && formik.errors.childPhone}
          />
          <TextField
            name='childPin'
            type='text'
            label='Rodné číslo'
            value={formik.values.childPin}
            onChange={event => formik.setFieldValue('childPin', formatStringByPattern('000000/0000', event.target.value))}
            error={formik.touched.childPin && Boolean(formik.errors.childPin)}
            helperText={formik.touched.childPin && formik.errors.childPin}
          />
          <h3>Část o zákoném zástupci:</h3>
          <TextField
            name='parentFirstname'
            type='text'
            label='Jméno'
            value={formik.values.parentFirstname}
            onChange={formik.handleChange}
            error={formik.touched.parentFirstname && Boolean(formik.errors.parentFirstname)}
            helperText={formik.touched.parentFirstname && formik.errors.parentFirstname}
          />
          <TextField
            name='parentSurname'
            type='text'
            label='Příjmení'
            value={formik.values.parentSurname}
            onChange={formik.handleChange}
            error={formik.touched.parentSurname && Boolean(formik.errors.parentSurname)}
            helperText={formik.touched.parentSurname && formik.errors.parentSurname}
          />
          <TextField
            name='parentEmail'
            type='email'
            label='Email'
            value={formik.values.parentEmail}
            onChange={formik.handleChange}
            error={formik.touched.parentEmail && Boolean(formik.errors.parentEmail)}
            helperText={formik.touched.parentEmail && formik.errors.parentEmail}
          />
          <TextField
            name='parentPhone'
            type='text'
            label='Telefonní číslo'
            value={formik.values.parentPhone}
            onChange={event => formik.setFieldValue('parentPhone', formatStringByPattern('000 000 000', event.target.value))}
            error={formik.touched.parentPhone && Boolean(formik.errors.parentPhone)}
            helperText={formik.touched.parentPhone && formik.errors.parentPhone}
          />
          <DatePicker
            name='parentBirthdate'
            label="Datum narození"
            defaultValue={formik.values.parentBirthdate}
            onChange={value => formik.setFieldValue('parentBirthdate', value)}
            value={formik.values.parentBirthdate}
            minDate={moment().year(moment().year() -15)}
            slotProps={{
              textField: {
                variant: 'outlined',
                error: formik.touched.parentBirthdate && Boolean(formik.errors.parentBirthdate),
                helperText: formik.touched.parentBirthdate && formik.errors.parentBirthdate
              }
            }}
          />
          <TextField
            name='parentPin'
            type='text'
            label='Rodné číslo'
            value={formik.values.parentPin}
            onChange={event => formik.setFieldValue('parentPin', formatStringByPattern('000000/0000', event.target.value))}
            error={formik.touched.parentPin && Boolean(formik.errors.parentPin)}
            helperText={formik.touched.parentPin && formik.errors.parentPin}
          />
          {/*todo connect mapy.cz api */}
          <TextField
            name='parentCity'
            type='text'
            label='Město'
            value={formik.values.parentCity}
            onChange={formik.handleChange}
            error={formik.touched.parentCity && Boolean(formik.errors.parentCity)}
            helperText={formik.touched.parentCity && formik.errors.parentCity}
          />
          <TextField
            name='parentStreet'
            type='text'
            label='Ulice a číslo popisné'
            value={formik.values.parentStreet}
            onChange={formik.handleChange}
            error={formik.touched.parentStreet && Boolean(formik.errors.parentStreet)}
            helperText={formik.touched.parentStreet && formik.errors.parentStreet}
          />
          <TextField
            name='parentZip'
            type='text'
            label='PSČ'
            value={formik.values.parentZip}
            onChange={formik.handleChange}
            error={formik.touched.parentZip && Boolean(formik.errors.parentZip)}
            helperText={formik.touched.parentZip && formik.errors.parentZip}
          />
        </div>
        <p className='message-error' ref={errorP}></p>
        <div className="buttons">
          <Button type='submit' variant="contained">Zaregistrovat se</Button>
        </div>
      </form>
    </>
  );
}
