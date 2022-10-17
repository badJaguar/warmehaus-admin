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
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditModal from '../modal/edit-modal';
import CreateModal from '../modal/create-modal';
import { useDeleteFloor } from '../api/hooks';
import { getFloorsByBrand } from '../api/axios-functions';
import BasicSelect from '../modal/basic-select';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { BRAND_MENU_ITEMS, KEY_TYPE_MENU_ITEMS } from '../utils/constants';
import { useLocation, useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

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

const colNames: ColNames = {
  brand: 'Бренд',
  description: "Тип",
  nominal: 'Номинал',
  price: 'Цена'
}

export default function BasicTable() {
  const { search } = useLocation();
  const {data, isLoading} = useQuery(['floors', search],() => getFloorsByBrand(search))

  const {mutateAsync: deleteFloor} = useDeleteFloor()
  const [searchParams, setSearchParams] = useSearchParams();

  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [floor, setFloor] = useState<Floor | undefined>()
  const [typeKeyValue, setTypeKeyValue] = useState(searchParams.get('typeKey') ?? '')
  const [brandValue, setBrandValue] =  useState(searchParams.get('brandKey') ??'')


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

  const onTypeKeyChange = (value: string) => {
    setTypeKeyValue(value)
    searchParams.set("typeKey", value);
    setSearchParams(searchParams);
    }

    const onBrandChange = (value: string) => {
      setBrandValue(value)
      searchParams.set("brandKey", value);
      setSearchParams(searchParams);
    }

    const dropParamsHandle = () => {
      setTypeKeyValue('')
      setSearchParams()
      setBrandValue('')
    }

    if (isLoading) {
      return <CircularProgress />
    }

  return (
    <TableContainer component={Paper}>
      <Button sx={{ m: 6, mt: 1, ml:1 }} variant='contained' onClick={toggleCreateModal}>Создать Новый</Button>
      <Box sx={{ pb:3}}>
        <Typography sx={{ pb:3 }} variant='h3'>Фильтры:</Typography>
        <Box sx={{display: 'flex'}}>
          <BasicSelect
          title={'По типу'}
          value={typeKeyValue}
          menuItems={KEY_TYPE_MENU_ITEMS}
          onChange={onTypeKeyChange}
        />
        <BasicSelect
          title={'По бренду'}
          value={brandValue}
          menuItems={BRAND_MENU_ITEMS}
          onChange={onBrandChange}
        />
        <Button sx={{ml: 6}} variant='contained' onClick={dropParamsHandle}>Сбросить</Button>
          </Box>
      </Box>
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
          {data?.length ? data.map((row: Floor) => (
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
          )): 
          <Typography variant='h2'>Нет данных</Typography>
        }
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