import { Container } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom';
import Routing from './login/Routing';

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Container sx={{mt:4}}>
          <Routing />
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
