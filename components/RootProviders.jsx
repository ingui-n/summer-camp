'use client';

import {SessionProvider} from "next-auth/react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {csCZ as coreCsCZ} from '@mui/material/locale';
import {csCZ} from '@mui/x-date-pickers/locales';
import moment from 'moment';
import 'moment/locale/cs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {SnackbarProvider} from "notistack";

const theme = createTheme({}, csCZ, coreCsCZ);

export default function RootProviders({children}) {
  moment.locale('cs');

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='cs'>
          <SnackbarProvider maxSnack={4}>
            {children}
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
