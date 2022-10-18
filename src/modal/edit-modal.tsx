import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ColNames, Floor } from '../table/TableComponent';
import { useUpdateFloor } from '../api/hooks';
import BasicSelect from './basic-select';
import { BRAND_MENU_ITEMS, KEY_TYPE_MENU_ITEMS } from '../utils/constants';

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

interface EditModalProps {
open: boolean
toggleModal: VoidFunction
colNames: ColNames
floor: Floor | undefined
}

const EditModal = (props: EditModalProps) => {
const {mutateAsync: updateFloor} = useUpdateFloor()

const {open, toggleModal, colNames, floor} = props;
const { nominal, price, description} = colNames;

const [priceValue, setPrice] = React.useState(floor?.price ?? 0)
const [descriptionValue, setDescriptionName]= React.useState(floor?.description ?? '')
const [nominalValue, setNominal] = React.useState(floor?.nominal ?? '')
const [brandValue, setBrandValue] =  React.useState(floor?.brandKey ?? '')
const [typeKeyValue, setTypeKeyValue] = React.useState(floor?.typeKey ?? '')

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

const saveHandle = () => {
  const brandName = BRAND_MENU_ITEMS.find(i => i.value === brandValue)?.name as string

if (floor) {
  updateFloor({
    id: floor?.id,
  floor: {
    brand: brandName,
    description: descriptionValue,
    typeKey: typeKeyValue,
    brandKey: brandValue,
    nominal: nominalValue,
    price: priceValue,
  }
  })
}
}


 React.useEffect(() => {
 if (floor) {
  setBrandValue(floor.brandKey)
  setNominal(floor.nominal)
  setDescriptionName(floor.description)
  setPrice(floor.price)
  setTypeKeyValue(floor.typeKey)
 }
 }, [floor])

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
          <Button sx={{ mt: 4 }} onClick={saveHandle} variant='contained'>Сохранить</Button>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(EditModal)