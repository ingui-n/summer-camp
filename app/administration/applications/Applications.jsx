'use client';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from "next/link";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {useState} from "react";
import {useSnackbar} from 'notistack';
import {Button} from "@mui/material";
import formatStringByPattern from "format-string-by-pattern";
import {getFormattedDateWithYear} from "@/lib/base";

export default function Applications({applicationsData, removeApplication}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [applications, setApplications] = useState(applicationsData);
  const {enqueueSnackbar} = useSnackbar();

  const handleRemoveUser = async registration => {
    const oldApplications = [...applications];
    setApplications(applications => applications.filter(({registrationID}) => registrationID !== registration.registrationID));
    setOpenConfirm(false);

    const {ok, err} = await removeApplication(registration);

    if (!ok) {
      setApplications(oldApplications);
      enqueueSnackbar(`Při odstraňování nastala chyba: ${err}`, {variant: 'error'});
    } else {
      enqueueSnackbar('Přihláška odstraněna', {variant: 'success'});
    }
  }

  const handleOpenRemoveDialog = async data => {
    setDialogProps({...dialogProps, message: `Chcete odstranit přihlášku od "${data.childFirstname} ${data.childSurname}"?`, data});
    setOpenConfirm(true);
  }

  const [dialogProps, setDialogProps] = useState({
    data: {},
    message: '',
    submitText: 'Odstranit',
    denyText: 'Zrušit',
    onClose: () => setOpenConfirm(false),
    onDeny: () => setOpenConfirm(false),
    onSubmit: handleRemoveUser
  });

  return (
    <>
      <div className="content">
        <table>
          <thead>
          <tr>
            <th>Jméno</th>
            <th>Příjmení</th>
            <th>Email zákonného z.</th>
            <th>Telefon zákonného z.</th>
            <th>Zaplaceno</th>
            <th>Datum registrace</th>
            <th>Upravit</th>
            <th>Odstranit</th>
          </tr>
          </thead>
          <tbody>
          {applications?.map((application, index) => (
            <tr key={index}>
              <td>{application.childFirstname}</td>
              <td>{application.childSurname}</td>
              <td>{application.parentEmail}</td>
              <td>{formatStringByPattern('000 000 000', application.parentPhone)}</td>
              <td>{application.isPaid ? 'Ano' : 'Ne'}</td>
              <td>{getFormattedDateWithYear(application.registrationDate)}</td>
              <td className='action-button'>
                <IconButton aria-label="edit">
                  <Link href={`/administration/applications/edit/${application.registrationID}`}>
                    <EditIcon/>
                  </Link>
                </IconButton>
              </td>
              <td className='action-button'>
                <IconButton
                  aria-label="remove"
                  onClick={async () => await handleOpenRemoveDialog(application)}
                >
                  <DeleteIcon/>
                </IconButton>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <ConfirmationDialog
        open={openConfirm}
        {...dialogProps}
      />
    </>
  );
}
