'use client';

import {Autocomplete, Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {foodValidationSchema} from "@/lib/validationSchemas";
import Link from "next/link";
import moment from "moment";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {isEqual} from "lodash";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {foodTypes} from "@/lib/configTypes";

const initialValues = {
  food_name: "",
  description: "",
  time: '',
  allergen: {label: '', name: '', number: '', alergenID: 0},
  type: 0
};


export default function EditFood({foodData = initialValues, allergensData, updateFood, addFood}) {
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();
  foodData.time = moment(foodData.time);

  if (typeof foodData.type === 'number') {
    foodData.type = foodTypes.find(({type}) => type === foodData.type) || {label: '', type: 0};
  }

  const submitForm = async ({...values}) => {
    values.time = values.time.format();

    if (values.type.type === 0) {
      enqueueSnackbar(`Vyberte typ jídla`, {variant: 'error'});
      return;
    }

    let res;

    if (addFood instanceof Function) {
      res = await addFood(values);
    } else {
      res = await updateFood(values);
    }

    if (res.ok) {
      enqueueSnackbar('Položka uložena', {variant: 'success'});
      if (addFood instanceof Function)
        router.push('/administration/food-menu');
    } else {
      enqueueSnackbar(`Nelze uložit: ${res.err}`, {variant: 'error'});
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
        <h2>Menu</h2>
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
              isOptionEqualToValue={isEqual}
              onChange={(_, value) => formik.setFieldValue('type', value)}
              name='type'
              value={formik.values.type.type !== 0 ? formik.values.type : null}
              options={foodTypes}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Typ jídla"
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                />
            }
              //todo error
            />
            <Autocomplete
              disablePortal
              isOptionEqualToValue={isEqual}//formik.values.allergen !== '' ? isEqual(option, value) : true
              onChange={(_, value) => formik.setFieldValue('allergen', value)}
              name='allergen'
              value={formik.values.allergen.alergenID !== 0 ? formik.values.allergen : null}
              options={allergensData}
              renderInput={(params) => <TextField {...params} label="Alergen"/>}
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
