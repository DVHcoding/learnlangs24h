// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import App from './App.tsx';
import './index.css';
import { store, persistor } from '@store/store.ts';
import Loader from '@pages/Loader/Loader.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
                <StyledEngineProvider injectFirst>
                    <App />
                    <ToastContainer />
                </StyledEngineProvider>
            </PersistGate>
        </Provider>
    </HelmetProvider>
);
