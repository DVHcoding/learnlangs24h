import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <StyledEngineProvider injectFirst>
            <App />
        </StyledEngineProvider>
    </HelmetProvider>
);
