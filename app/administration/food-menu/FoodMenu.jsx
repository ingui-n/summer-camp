'use client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from "next/link";
import moment from 'moment';

export default function FoodMenu({menuData}) {
  console.log(menuData)

  const getFormattedDate = date => {
    return moment(date).format('DD.MM.\xa0HH:mm');
  };

  const handleRemoveDialog = async () => {
    //todo are you sure?
  }

  return (
    <>
      <div className="content">
        <button className="btn-create btn">CREATE NEW</button>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Alergen</th>
            <th>Time</th>
            <th>UPRAVIT</th>
            <th>SMAZAT</th>
          </tr>
          </thead>
          <tbody>
          {menuData && menuData.map((food, index) => (
            <tr key={index}>
              <td>{food.food_name}</td>
              <td>{food.description}</td>
              <td>{food.number}</td>
              <td>{getFormattedDate(food.time)}</td>
              <td className='action-button'><IconButton aria-label="edit"><Link href={`/administration/food-menu/edit/${food.food_ID}`}><EditIcon/></Link></IconButton></td>
              <td className='action-button'><IconButton aria-label="remove" onClick={handleRemoveDialog}><DeleteIcon/></IconButton></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
