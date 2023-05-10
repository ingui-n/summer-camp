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

export default function Workers({workersData, removeWorker}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [workers, setWorkers] = useState(workersData);
  const {enqueueSnackbar} = useSnackbar();

  const handleRemoveWorker = async worker => {
    if (worker.profileImage)
      delete worker.profileImage

    const oldWorkers = [...workers];
    setWorkers(workers => workers.filter(({workerID}) => workerID !== worker.workerID));
    setOpenConfirm(false);

    const {ok, err} = await removeWorker(worker);

    if (!ok) {
      setWorkers(oldWorkers);
      enqueueSnackbar(`Při odstraňování nastala chyba: ${err}`, {variant: 'error'});
    } else {
      enqueueSnackbar('Pracovník odstraněn', {variant: 'success'});
    }
  }

  const handleOpenRemoveDialog = async (data) => {
    setDialogProps({...dialogProps, message: `Chcete odstranit pracovníka "${data.firstname} ${data.surname}"?`, data});
    setOpenConfirm(true);
  }

  const [dialogProps, setDialogProps] = useState({
    data: {},
    message: '',
    submitText: 'Odstranit',
    denyText: 'Zrušit',
    onClose: () => setOpenConfirm(false),
    onDeny: () => setOpenConfirm(false),
    onSubmit: handleRemoveWorker
  });

  return (
    <>
      <div className="content">
        <Link href='/administration/workers/add'>
          <Button variant='outlined' color='info' className='config-button'>Vytvořit</Button>
        </Link>
        <table>
          <thead>
          <tr>
            <th>Jméno</th>
            <th>Příjmení</th>
            <th>Pracovní pozice</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Upravit</th>
            <th>Odstranit</th>
          </tr>
          </thead>
          <tbody>
          {workers?.map((worker, index) => (
            <tr key={index}>
              <td>{worker.firstname}</td>
              <td>{worker.surname}</td>
              <td>{worker.jobDescription}</td>
              <td>{worker.email}</td>
              <td>{formatStringByPattern('000 000 000', worker.phone)}</td>
              <td className='action-button'>
                <IconButton aria-label="edit">
                  <Link href={`/administration/workers/edit/${worker.workerID}`}>
                    <EditIcon/>
                  </Link>
                </IconButton>
              </td>
              <td className='action-button'>
                <IconButton
                  aria-label="remove"
                  onClick={async () => await handleOpenRemoveDialog(worker)}
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
