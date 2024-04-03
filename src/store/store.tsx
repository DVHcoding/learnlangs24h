// ##########################
// #      IMPORT NPM        #
// ##########################
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';

// ##########################
// #    IMPORT Components   #
// ##########################

// ##########################
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
