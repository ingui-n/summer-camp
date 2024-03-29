import {signIn} from "next-auth/react";
import moment from "moment/moment";

const reparseJson = json => {
  return JSON.parse(JSON.stringify(json));
};

const signInCredentials = async (name, password) => {
  return await signIn("credentials", {name, password, redirect: false});
};

const validateWithSchema = async (schema, values) => {
  let res = {ok: false, err: null};

  try {
    await schema.validate(values);
    res.ok = true;
  } catch ({message}) {
    res.err = message;
  }

  return res;
};

const getFormattedDates = (from, to) => {
  const dateFrom = moment(from).format('DD.MM.\xa0HH:mm');
  const dateTo = moment(to).format('\xa0-\xa0HH:mm');

  return dateFrom + dateTo;
};

const getFormattedDate = date => {
  return moment(date).format('DD.MM.\xa0HH:mm');
};

const getFormattedDateWithYear = date => {
  return moment(date).format('DD.MM.YYYY\xa0HH:mm');
};

const isUserAdmin = user => {
  return user.role === 3;
};

const isUserBasic = user => {
  return user.role === 1;
};

const getDecodedFile = buffer => {
  const json = JSON.stringify(buffer);

  const data = JSON.parse(json, (key, value) =>
    value && value.type === 'Buffer' ? Buffer.from(value) : value
  );

  return new TextDecoder('utf8').decode(data);
};

export {
  reparseJson,
  signInCredentials,
  validateWithSchema,
  isUserAdmin,
  getFormattedDates,
  getFormattedDate,
  getFormattedDateWithYear,
  getDecodedFile,
  isUserBasic
};
