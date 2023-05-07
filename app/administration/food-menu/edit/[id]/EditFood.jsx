'use client';

import {Autocomplete, Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {foodValidationSchema} from "@/lib/validationSchemas";
import Link from "next/link";
import moment from "moment";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {isEqual} from "lodash";
import {useSnackbar} from "notistack";

const initialValues = {
  food_name: "",
  description: "",
  time: '',
  allergen: {}
};

export default function EditFood({foodData = initialValues, allergensData, updateFood}) {
  const {enqueueSnackbar} = useSnackbar();
  foodData.time = moment(foodData.time);

  const submitForm = async (values) => {
    values.time = values.time.format();

    const res = await updateFood(values);

    if (res) {
      enqueueSnackbar('Položka uložena', {variant: 'success'});
    } else {
      enqueueSnackbar('Nelze uložit', {variant: 'error'});
    }
  };

  const formik = useFormik(
    {
      initialValues: foodData,
      validationSchema: foodValidationSchema,
      onSubmit: submitForm,
    }
  );

  return (
    <>
      <div className='content'>
        <h2>Úprava jídla:</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='content form-inputs'>
            <TextField
              name='food_name'
              type='text'
              label='Název jídla'
              value={formik.values.food_name}
              onChange={formik.handleChange}
              error={formik.touched.food_name && Boolean(formik.errors.food_name)}
              helperText={formik.touched.food_name && formik.errors.food_name}
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
            <Autocomplete
              disablePortal
              isOptionEqualToValue={(option, value) => formik.values.allergen !== '' ? isEqual(option, value) : true}
              onChange={(_, value) => formik.setFieldValue('allergen', value)}
              formik={formik}
              defaultValue={formik.values.allergen}
              name='allergen'
              options={allergensData}
              getOptionLabel={option => option.name}
              renderInput={(params) => <TextField {...params} error={formik.touched.allergen && Boolean(formik.errors.allergen)}
                                                  helperText={formik.touched.allergen && formik.errors.allergen} label="Alergen"/>}
              //todo error
            />
            <DateTimePicker
              formik={formik}
              name='time'
              label='Datum'
              onChange={value => formik.setFieldValue('time', value)}
              value={moment(formik.values.time)}
              defaultValue={moment(formik.values.time)}
            />
          </div>
          <div className='form-buttons'>
            <Link href='/administration/food-menu'>
              <Button variant="outlined">Zpět</Button>
            </Link>
            <Button type='submit' variant="contained">Uložit</Button>
          </div>
        </form>
      </div>
    </>
  );
}