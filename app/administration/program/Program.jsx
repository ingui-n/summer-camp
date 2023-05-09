'use client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from "next/link";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {useState} from "react";
import {useSnackbar} from 'notistack';
import {Button} from "@mui/material";
import {getFormattedDates} from "@/lib/base";

export default function Program({programData, removeProgram}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [programs, setPrograms] = useState(programData);
  const {enqueueSnackbar} = useSnackbar();

  const handleRemoveProgram = async program => {
    const oldPrograms = [...programs];
    setPrograms(programs => programs.filter(({programID}) => programID !== program.programID));
    setOpenConfirm(false);

    const {ok, err} = await removeProgram(program);

    if (!ok) {
      setPrograms(oldPrograms);
      enqueueSnackbar(`Při odstraňování nastala chyba: ${err}`, {variant: 'error'});
    } else {
      enqueueSnackbar('Program odstraněn', {variant: 'success'});
    }
  }

  const handleOpenRemoveDialog = async data => {
    setDialogProps({...dialogProps, message: `Chcete odstranit program "${data.name}"?`, data});
    setOpenConfirm(true);
  }

  const [dialogProps, setDialogProps] = useState({
    data: {},
    message: '',
    submitText: 'Odstranit',
    denyText: 'Zrušit',
    onClose: () => setOpenConfirm(false),
    onDeny: () => setOpenConfirm(false),
    onSubmit: handleRemoveProgram
  });

  return (
    <>
      <div className="content">
        <Link href='/administration/program/add'>
          <Button variant='outlined' color='info' className='config-button'>Vytvořit</Button>
        </Link>
        <table>
          <thead>
          <tr>
            <th>Název</th>
            <th>Od - do</th>
            <th>Popis</th>
            <th>Upravit</th>
            <th>Odstranit</th>
          </tr>
          </thead>
          <tbody>
          {programs?.map((program, index) => (
            <tr key={index}>
              <td>{program.name}</td>
              <td>{getFormattedDates(program.from, program.to)}</td>
              <td>{program.description}</td>
              <td className='action-button'>
                <IconButton aria-label="edit">
                  <Link href={`/administration/program/edit/${program.programID}`}>
                    <EditIcon/>
                  </Link>
                </IconButton>
              </td>
              <td className='action-button'>
                <IconButton
                  aria-label="remove"
                  onClick={async () => await handleOpenRemoveDialog(program)}
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
