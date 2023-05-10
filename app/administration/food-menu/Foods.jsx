'use client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from "next/link";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {useState} from "react";
import {useSnackbar} from 'notistack';
import {Button} from "@mui/material";
import {foodTypes} from "@/lib/configTypes";
import {getFormattedDate} from "@/lib/base";

export default function Foods({menuData, removeFood}) {//todo data are not updated after changes
  const [openConfirm, setOpenConfirm] = useState(false);
  const [foods, setFoods] = useState(menuData);
  const {enqueueSnackbar} = useSnackbar();

  const handleRemoveFood = async ({food}) => {
    const oldFoods = [...foods];
    setFoods(foods => foods.filter(({foodID}) => foodID !== food.foodID));
    setOpenConfirm(false);

    const {ok} = await removeFood(food);

    if (!ok) {
      setFoods(oldFoods);
      enqueueSnackbar('Při odstraňování nastala chyba', {variant: 'error'});
    } else {
      enqueueSnackbar('Položka odstraněna', {variant: 'success'});
    }
  }

  const handleOpenRemoveDialog = async (food) => {
    setDialogProps({...dialogProps, message: `Chcete odstranit položku "${food.food_name}"?`, data: {food}});
    setOpenConfirm(true);
  }

  const [dialogProps, setDialogProps] = useState({
    data: {},
    message: '',
    submitText: 'Odstranit',
    denyText: 'Zrušit',
    onClose: () => setOpenConfirm(false),
    onDeny: () => setOpenConfirm(false),
    onSubmit: handleRemoveFood
  });

  return (
    <>
      <div className="content">
        <Link href='/administration/food-menu/add'>
          <Button className='config-button' variant='outlined' color='info'>Vytvořit</Button>
        </Link>
        <table>
          <thead>
          <tr>
            <th>Název</th>
            <th>Popis</th>
            <th>Typ</th>
            <th>Alergen</th>
            <th>Čas</th>
            <th>Upravit</th>
            <th>Odstranit</th>
          </tr>
          </thead>
          <tbody>
          {foods?.map((food, index) => (
            <tr key={index}>
              <td>{food.food_name}</td>
              <td>{food.description}</td>
              <td>{foodTypes.find(({type}) => type === food.type)?.label || ''}</td>
              <td>{food.number}</td>
              <td>{getFormattedDate(food.time)}</td>
              <td className='action-button'>
                <IconButton aria-label="edit">
                  <Link href={`/administration/food-menu/edit/${food.foodID}`}>
                    <EditIcon/>
                  </Link>
                </IconButton>
              </td>
              <td className='action-button'>
                <IconButton
                  aria-label="remove"
                  onClick={async () => await handleOpenRemoveDialog(food)}
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
