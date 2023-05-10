'use client';

import {Autocomplete, Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {workerValidationSchema} from "@/lib/validationSchemas";
import Link from "next/link";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {isEqual} from "lodash";
import formatStringByPattern from "format-string-by-pattern";
import {useEffect, useRef, useState} from "react";
import moment from "moment";
import {getDecodedFile} from "@/lib/base";

const initialValues = {
  surname: "",
  firstname: "",
  jobType: 0,
  jobDescription: '',
  email: '',
  phone: '',
  title: '',
  profileUploadDate: '',
  profileImageType: '',
  profileImage: '',
};


export default function EditWorker({workerData = initialValues, jobsData, updateWorker, addWorker}) {
  const imageRef = useRef(null);
  const [isSetImage, setIsSetImage] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();

  if (typeof workerData.jobType === 'number') {
    workerData.jobType = jobsData.find(({type}) => type === workerData.jobType) || {description: '', jobID: 0};
  }

  if (workerData.phone !== '') {
    workerData.phone = formatStringByPattern('000 000 000', workerData.phone);
  }

  useEffect(() => {
    if (typeof workerData.profileImage === 'object') {
      workerData.profileImage = getDecodedFile(workerData.profileImage);
      setIsSetImage(Boolean(workerData.profileImage));
    }
  }, [workerData]);

  const submitForm = async values => {
    // values.loginID = session.user.id;

    if (values.jobType.jobID === 0) {
      enqueueSnackbar(`Vyberte typ pracovní pozice`, {variant: 'error'});
      return;
    }

    if (values.profileImage === '') {
      enqueueSnackbar(`Nahrajte profilový obrázek`, {variant: 'error'});
      return;
    }

    let res;

    if (addWorker instanceof Function) {
      res = await addWorker(values);
    } else {
      res = await updateWorker(values);
    }

    if (res.ok) {
      enqueueSnackbar('Položka uložena', {variant: 'success'});
      if (addWorker instanceof Function)
        router.push('/administration/workers');
    } else {
      enqueueSnackbar(`Nelze uložit: ${res.err}`, {variant: 'error'});
    }
  };

  const handleImage = e => {
    if (!e.target.files) {
      setImageValues('', '', '');
      setIsSetImage(false);
      return;
    }

    const file = e.target.files[0];

    if (file.size > 1000000) {
      enqueueSnackbar('Obrázek musí mít méně než 1MB', {variant: 'error'});
      setImageValues('', '', '');
      setIsSetImage(false);
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setImageValues(reader.result, file.type, moment().format());

      setIsSetImage(Boolean(reader.result));

      if (imageRef.current?.src) {
        imageRef.current.src = reader.result;
      }
    }, false);

    if (file)
      reader.readAsDataURL(file);
  };

  const setImageValues = (profileImage, profileImageType, profileUploadDate) => {
    formik.setFieldValue('profileImage', profileImage);
    formik.setFieldValue('profileImageType', profileImageType);
    formik.setFieldValue('profileUploadDate', profileUploadDate);
  };

  const formik = useFormik(
    {
      initialValues: workerData,
      validationSchema: workerValidationSchema,
      onSubmit: submitForm,
    }
  );

  return (
    <>
      <div className='content'>
        <h2>Pracovník</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='content form-inputs'>
            <TextField
              name='firstname'
              type='text'
              label='Jméno'
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
            <TextField
              name='surname'
              type='text'
              label='Příjmení'
              value={formik.values.surname}
              onChange={formik.handleChange}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
            />
            <TextField
              name='title'
              type='text'
              label='Titul'
              value={formik.values.title || ''}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
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
            <TextField
              name='phone'
              type='text'
              label='Telefonní číslo'
              value={formik.values.phone}
              onChange={event => formik.setFieldValue('phone', formatStringByPattern('000 000 000', event.target.value))}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <Autocomplete
              disablePortal
              getOptionLabel={option => option.description}
              isOptionEqualToValue={(option, value) => value.jobType !== 0 ? isEqual(option, value) : true}
              onChange={(_, value) => formik.setFieldValue('jobType', value)}
              name='jobType'
              value={formik.values.jobType.jobID !== 0 ? formik.values.jobType : null}
              options={jobsData}
              renderInput={(params) => <TextField {...params} label="Pracovní pozice"/>}
              //todo error
            />
            {isSetImage &&
              <img
                src={formik.values.profileImage}
                ref={imageRef}
                className='profile-image'
                alt="Profilový&nbsp;obrázek"
              />
            }
            <Button
              variant="contained"
              component="label"
              className='profile-button'
            >
              Nahrát profilový obrázek
              <input
                onChange={handleImage}
                type="file"
                hidden
              />
            </Button>
            <p>Maximální velikost: 1MB</p>
          </div>
          <div className='form-buttons'>
            <Link href='/administration/workers'>
              <Button variant="outlined">Zpět</Button>
            </Link>
            <Button type='submit' variant="contained">Uložit</Button>
          </div>
        </form>
      </div>
    </>
  );
}
