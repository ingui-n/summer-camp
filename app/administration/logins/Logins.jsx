'use client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from "next/link";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {useState} from "react";
import {useSnackbar} from 'notistack';
import {Button} from "@mui/material";
import {loginRoles} from "@/lib/configTypes";

export default function Logins({loginsData, removeLogin}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [logins, setLogins] = useState(loginsData);
  const {enqueueSnackbar} = useSnackbar();

  const handleRemoveLogin = async (login) => {
    const oldLogins = [...logins];
    setLogins(logins => logins.filter(({loginID}) => loginID !== login.loginID));
    setOpenConfirm(false);

    const {ok, err} = await removeLogin(login);

    if (!ok) {
      setLogins(oldLogins);
      enqueueSnackbar(`Při odstraňování nastala chyba: ${err}`, {variant: 'error'});
    } else {
      enqueueSnackbar('Uživatel odstraněn', {variant: 'success'});
    }
  }

  const handleOpenRemoveDialog = async (data) => {
    setDialogProps({...dialogProps, message: `Chcete odstranit uživatele "${data.name}"?`, data});
    setOpenConfirm(true);
  }

  const [dialogProps, setDialogProps] = useState({
    data: {},
    message: '',
    submitText: 'Odstranit',
    denyText: 'Zrušit',
    onClose: () => setOpenConfirm(false),
    onDeny: () => setOpenConfirm(false),
    onSubmit: handleRemoveLogin
  });

  return (
    <>
      <div className="content">
        <Link href='/administration/logins/add'>
          <Button variant='outlined' color='info' className='config-button'>Vytvořit</Button>
        </Link>
        <table>
          <thead>
          <tr>
            <th>Login</th>
            <th>Email</th>
            <th>Typ uživatele</th>
            <th>Upravit</th>
            <th>Odstranit</th>
          </tr>
          </thead>
          <tbody>
          {logins?.map((login, index) => (
            <tr key={index}>
              <td>{login.name}</td>
              <td>{login.email}</td>
              <td>{loginRoles.find(({role}) => role === login.role)?.label || ''}</td>
              <td className='action-button'>
                <IconButton aria-label="edit">
                  <Link href={`/administration/logins/edit/${login.loginID}`}>
                    <EditIcon/>
                  </Link>
                </IconButton>
              </td>
              <td className='action-button'>
                <IconButton
                  aria-label="remove"
                  onClick={async () => await handleOpenRemoveDialog(login)}
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
