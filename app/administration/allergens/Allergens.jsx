'use client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from "next/link";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {useState} from "react";
import {useSnackbar} from 'notistack';
import {Button} from "@mui/material";

export default function Allergens({allergensData, removeAllergen}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [allergens, setAllergens] = useState(allergensData);
  const {enqueueSnackbar} = useSnackbar();

  const handleRemoveAllergen = async (allergen) => {
    const oldAllergens = [...allergens];
    setAllergens(allergens => allergens.filter(({alergenID}) => alergenID !== allergen.alergenID));
    setOpenConfirm(false);

    const {ok, err} = await removeAllergen(allergen);

    if (!ok) {
      setAllergens(oldAllergens);
      enqueueSnackbar(`Při odstraňování nastala chyba: ${err}`, {variant: 'error'});
    } else {
      enqueueSnackbar('Položka odstraněna', {variant: 'success'});
    }
  }

  const handleOpenRemoveDialog = async (allergen) => {
    setDialogProps({...dialogProps, message: `Chcete odstranit položku "${allergen.name}"?`, data: allergen});
    setOpenConfirm(true);
  }

  const [dialogProps, setDialogProps] = useState({
    data: {},
    message: '',
    submitText: 'Odstranit',
    denyText: 'Zrušit',
    onClose: () => setOpenConfirm(false),
    onDeny: () => setOpenConfirm(false),
    onSubmit: handleRemoveAllergen
  });

  return (
    <>
      <div className="content">
        <Link href='/administration/allergens/add'>
          <Button variant='outlined' color='info' className='config-button'>Vytvořit</Button>
        </Link>
        <table>
          <thead>
          <tr>
            <th>Název</th>
            <th>Čísla alergenů</th>
            <th>Upravit</th>
            <th>Odstranit</th>
          </tr>
          </thead>
          <tbody>
          {allergens?.map((allergen, index) => (
            <tr key={index}>
              <td>{allergen.name}</td>
              <td>{allergen.number}</td>
              <td className='action-button'>
                <IconButton aria-label="edit">
                  <Link href={`/administration/allergens/edit/${allergen.alergenID}`}>
                    <EditIcon/>
                  </Link>
                </IconButton>
              </td>
              <td className='action-button'>
                <IconButton
                  aria-label="remove"
                  onClick={async () => await handleOpenRemoveDialog(allergen)}
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
