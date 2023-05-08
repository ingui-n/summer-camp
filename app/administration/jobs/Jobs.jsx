'use client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from "next/link";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {useState} from "react";
import {useSnackbar} from 'notistack';
import {Button} from "@mui/material";

export default function Jobs({jobsData, removeJob}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [jobs, setJobs] = useState(jobsData);
  const {enqueueSnackbar} = useSnackbar();

  const handleRemoveJob = async (job) => {
    const oldJobs = [...jobs];
    setJobs(jobs => jobs.filter(({jobID}) => jobID !== job.jobID));
    setOpenConfirm(false);

    const {ok, err} = await removeJob(job);

    if (!ok) {
      setJobs(oldJobs);
      enqueueSnackbar(`Při odstraňování nastala chyba: ${err}`, {variant: 'error'});
    } else {
      enqueueSnackbar('Položka odstraněna', {variant: 'success'});
    }
  }

  const handleOpenRemoveDialog = async (data) => {
    setDialogProps({...dialogProps, message: `Chcete odstranit položku "${data.description}"?`, data});
    setOpenConfirm(true);
  }

  const [dialogProps, setDialogProps] = useState({
    data: {},
    message: '',
    submitText: 'Odstranit',
    denyText: 'Zrušit',
    onClose: () => setOpenConfirm(false),
    onDeny: () => setOpenConfirm(false),
    onSubmit: handleRemoveJob
  });

  return (
    <>
      <div className="content">
        <Link href='/administration/jobs/add'>
          <Button variant='outlined' color='info' className='config-button'>Vytvořit</Button>
        </Link>
        <table>
          <thead>
          <tr>
            <th>Název</th>
            <th>Typ</th>
            <th>Upravit</th>
            <th>Odstranit</th>
          </tr>
          </thead>
          <tbody>
          {jobs?.map((job, index) => (
            <tr key={index}>
              <td>{job.description}</td>
              <td>{job.type}</td>
              <td className='action-button'>
                <IconButton aria-label="edit">
                  <Link href={`/administration/jobs/edit/${job.jobID}`}>
                    <EditIcon/>
                  </Link>
                </IconButton>
              </td>
              <td className='action-button'>
                <IconButton
                  aria-label="remove"
                  onClick={async () => await handleOpenRemoveDialog(job)}
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
