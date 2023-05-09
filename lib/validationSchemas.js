import * as Yup from "yup";
import isEmail from "validator/lib/isEmail";

const signUpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Login je moc krátký')
    .max(20, 'Login je moc dlouhý')
    .required("Zadejte login"),
  email: Yup.string()
    .email("Neplatná emailová adresa")
    .test('email', 'Neplatná emailová adresa', value => isEmail(value))
    .required("Zadejte emailovou adresu"),
  password: Yup.string()
    .min(6, "Heslo musí mít alespoň 6 znaků")
    .max(100, 'Heslo je moc dlouhé')
    .required("Zadejte heslo")
});

const logInValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Zadejte login"),
  password: Yup.string()
    .required("Zadejte heslo")
});

const foodValidationSchema = Yup.object().shape({
  food_name: Yup.string()
    .required("Zadejte název jídla"),
  description: Yup.string(),
  time: Yup.date()
    .required('Vyberte čas'),
  allergen: Yup.object({
    alergenID: Yup.number(),
    number: Yup.string(),
    name: Yup.string()
  })
    .required('Vyberte alergen'),
  type: Yup.object({
    label: Yup.string(),
    type: Yup.number()
  })
    .required()
});

const registerValidationSchema = Yup.object().shape({
  childFirstname: Yup.string()
    .required('Child first name is required'),
  childSurname: Yup.string()
    .required('Child surname is required'),
  childPhone: Yup.string()
    .test('childPhone', 'Neplatné telefonní číslo', val => /^[1-9]\d{2}\s\d{3}\s\d{3}$/.test(val))
    .required('Child phone number is required'),
  childBirthdate: Yup.string()
    .required('Child birthdate is required'),
  childPin: Yup.string()
    .required('Child PIN is required'),
  parentFirstname: Yup.string()
    .required('Parent first name is required'),
  parentSurname: Yup.string()
    .required('Parent surname is required'),
  parentEmail: Yup.string()
    .email('Invalid email')
    .test('validateEMail', 'Neplatná emailová adresa', val => isEmail(val))
    .required('Email is required'),
  parentPhone: Yup.string()
    .test('parentPhone', 'Neplatné telefonní číslo', val => /^[1-9]\d{2}\s\d{3}\s\d{3}$/.test(val))
    .required('Parent phone number is required'),
  parentBirthdate: Yup.date()
    .required('Parent birthdate is required'),
  parentPin: Yup.string()
    .test('parentZip', 'Neplatné rodné číslo', val => /^\d{6}\/\d{4}$/.test(val))
    .required('Parent PIN is required'),
  parentCity: Yup.string()
    .required('Parent city is required'),
  parentStreet: Yup.string()
    .required('Parent street is required'),
  parentZip: Yup.string()
    .test('parentZip', 'Neplatné PSČ', val => /^\d{3}\s\d{2}$/.test(val))
    .required('Zadejte PSČ'),
});

const allergenValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Zadejte název alergenu"),
  number: Yup.string()
    .required("Zadejte čísla alergenů")
});

const jobValidationSchema = Yup.object().shape({
  description: Yup.string()
    .required("Zadejte název pracovní pozice"),
  type: Yup.number()
    .max(255, 'Číslo musí být menší než 255')
    .typeError('Zadejte číslo')
    .required("Zadejte číslo")
});

const adminLogInValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Zadejte login uživatele"),
  email: Yup.string()
    .email('Špatný email')
    .test('validateEMail', 'Neplatná emailová adresa', isEmail)
    .required('Zadejte email'),
  password: Yup.string()
    .min(6, 'Heslo je moc krátké'),
  role: Yup.object().shape({
    label: Yup.string(),
    role: Yup.number()
  })
});

const programValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Zadejte název programu"),
  description: Yup.string(),
  from: Yup.date()
    .required('Vyberte čas'),
  to: Yup.date()
    .required('Vyberte čas')
});

export {
  signUpValidationSchema,
  logInValidationSchema,
  foodValidationSchema,
  registerValidationSchema,
  allergenValidationSchema,
  jobValidationSchema,
  adminLogInValidationSchema,
  programValidationSchema
};
