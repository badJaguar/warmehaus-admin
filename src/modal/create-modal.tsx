import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ColNames } from '../table/TableComponent';
import BasicSelect, { Item } from './basic-select';
import { useCreateFloor } from '../api/hooks';

export interface CreateFloorDto {
  description: string;
  typeKey: string;
  brand: string;
  brandKey: string;
  nominal: string;
  price: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface CreateModalProps {
  open: boolean
  toggleModal: VoidFunction
  colNames: ColNames
}

export const BRAND_MENU_ITEMS: Item[] = [
  {name: 'Warmehaus', value: 'warmehaus'},
  {name: 'Arnold Rak', value: 'arnoldRak'},
  {name: 'Raychem', value: 'raychem'},
  {name: 'Nexans', value: 'nexans'},
]

export const KEY_TYPE_MENU_ITEMS: Item[] = [
  {name: 'Маты', value: 'mats'},
  {name: 'Кабель', value: 'cable'},
  {name: 'Плёнка', value: 'film'},
  {name: 'Регулятор', value: 'regulator'},
  {name: 'Антиоблединение', value: 'antiicing'},
]

const CreateModal = (props: CreateModalProps) => {
const {open, toggleModal, colNames} = props;
const {nominal, price, description} = colNames;

const {mutateAsync: createFloor} = useCreateFloor()

const [priceValue, setPrice] = React.useState(0)
const [descriptionValue, setDescriptionName] = React.useState('')
const [nominalValue, setNominal] = React.useState('')
const [brandValue, setBrandValue] = React.useState('')
const [typeKeyValue, setTypeKeyValue] = React.useState('')

const onBrandChange = (value: string) => {
    setBrandValue(value)    
}

const onTypeKeyChange = (value: string) => {
  setTypeKeyValue(value)
}

const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setDescriptionName(e.target.value)
}

const onNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNominal(e.target.value)
}
const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+e.target.value)
}

const saveCreateHandle = async () => {

  const brandName = BRAND_MENU_ITEMS.find(i => i.value === brandValue)?.name as string

 await createFloor({
    brand: brandName,
    description: descriptionValue,
    typeKey: typeKeyValue,
    brandKey: brandValue,
    nominal: nominalValue,
    price: priceValue,
  })

  toggleModal()
}

  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <IconButton onClick={toggleModal} >
          <CloseIcon />
        </IconButton>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
        <BasicSelect
          title={'Бренд'}
          value={brandValue}
          menuItems={BRAND_MENU_ITEMS}
          onChange={onBrandChange}
          />
        <BasicSelect
          title={'Предназначение'}
          value={typeKeyValue}
          menuItems={KEY_TYPE_MENU_ITEMS}
          onChange={onTypeKeyChange}
          />
          <TextField value={descriptionValue} label={description} variant="outlined" fullWidth onChange={onDescriptionChange} />
          <TextField value={nominalValue} label={nominal} variant="outlined" fullWidth onChange={onNominalChange} />
          <TextField label={price} type="number" variant="outlined" fullWidth value={priceValue} onChange={onPriceChange} />
          <Button sx={{ mt: 4 }} onClick={saveCreateHandle} variant='contained'>Добавить</Button>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(CreateModal)