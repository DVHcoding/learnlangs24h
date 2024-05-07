import ReactDOM from 'react-dom/client';

// ##########################
// #      IMPORT NPM        #
// ##########################
import { HelmetProvider } from 'react-helmet-async';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

// ##########################
// #    IMPORT Components   #
// ##########################
import App from './App.tsx';
import './index.css';
import { store } from './store/store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <App />
            </StyledEngineProvider>
        </Provider>
    </HelmetProvider>
);
