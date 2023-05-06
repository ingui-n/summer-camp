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

const logInvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Zadejte login"),
  password: Yup.string()
    .required("Zadejte heslo")
});


export {signUpValidationSchema, logInvalidationSchema};
