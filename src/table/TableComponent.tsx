import {useState, useCallback} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  useQuery,
} from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditModal from '../modal/edit-modal';
import CreateModal from '../modal/create-modal';
import { useDeleteFloor } from '../api/hooks';

export interface Floor {
  id: string;
  description: string;
  typeKey: string;
  brand: string;
  brandKey: string;
  nominal: string;
  price: number;
}

export interface ColNames extends Omit<Floor, 'id' | 'price' | 'brandKey' | 'typeKey'> {
  price: string
}

export const getFloorsByBrand = async (brandKey?: string, typeKey?: string): Promise<Floor[]> => new Promise<Floor[]>(
  (resolve, reject) => {
    const mainUrl = "https://warmehouse-be.herokuapp.com/floors/filterByParams"
    const brandQuery = brandKey ? `brandKey=${brandKey}` : ''
    const typeQuery = typeKey ? `typeKey=${typeKey}` : ''

    axios.get(`${mainUrl}?${brandQuery}&${typeQuery}`)
      .then((response: AxiosResponse<any>) => resolve(response.data))
      .catch((error: AxiosError<string>) => reject(error));
  },
);

const colNames: ColNames = {
  brand: 'Бренд',
  description: "Тип",
  nominal: 'Номинал',
  price: 'Цена'
}

export default function BasicTable() {
  const {data} = useQuery(['floors'],() => getFloorsByBrand())

  const {mutateAsync: deleteFloor} = useDeleteFloor()

  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [floor, setFloor] = useState<Floor | undefined>()

  const toggleEditModal = () => (floor: Floor) => {
    setEditOpen(val => !val)
    setFloor(floor)
  };

  const deleteItemHandle = () => (id: string) => 
  deleteFloor(id)

  const toggleCreateModal = () => {
    setCreateOpen(val => !val)
  }

  const onEditCloseHandle = useCallback(() => {
    setFloor(undefined)
    setEditOpen(false)
  }, [])

  const onCreateCloseHandle = useCallback(() => {
    setCreateOpen(false)
  }, [])

  return (
    <TableContainer component={Paper}>
      <Button sx={{ m: 6, mt: 1, ml:1 }} variant='contained' onClick={toggleCreateModal}>Создать Новый</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{colNames.brand}</TableCell>
            <TableCell>{colNames.description}</TableCell>
            <TableCell>{colNames.nominal}</TableCell>
            <TableCell>{colNames.price}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: Floor) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.brand}
              </TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.nominal}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="center">
                <IconButton sx={{mr:2}} onClick={() => toggleEditModal()(row)}>
                <EditIcon color='info' />
                </IconButton>
                <IconButton onClick={() => deleteItemHandle()(row.id)}>
                <DeleteForeverIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditModal
        open={editOpen}
        toggleModal={onEditCloseHandle}
        colNames={colNames}
        floor={floor}
      />
      <CreateModal
        toggleModal={onCreateCloseHandle}
        colNames={colNames}
        open={createOpen}
      />
    </TableContainer>
  );
}