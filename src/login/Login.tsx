import {useState} from 'react'
import {Button,Paper, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = function (): JSX.Element {
  const [loginValue, setLoginValue] = useState('')
  const navigate = useNavigate()

  const onClickHandle = () => {
    sessionStorage.setItem('login', loginValue)
    navigate('/table')
    
  }
  const onInputChange = (e: any) => {
    console.log(e.target.value);
    setLoginValue(e.target.value)
  }
  return (
    <Grid onSubmit={onClickHandle} component="form" item container xs={5} wrap="nowrap" sx={{m: 'auto'}}>
      <Paper elevation={5} sx={{p:6, m: 'auto'}}>
        <TextField type="password" onChange={onInputChange} />
        <Button type="submit">Войти</Button>
      </Paper>
    </Grid>
  );
};

export default Login;
