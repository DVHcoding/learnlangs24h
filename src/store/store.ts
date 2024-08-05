// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import rootReducer from '@store/rootReducer';
import { userApi } from '@store/api/userApi';
import { courseApi } from '@store/api/courseApi';
import { chatApi } from '@store/api/chatApi';
import { commentApi } from './api/comment.api';
import { notificationApi } from './api/notification.api';
import { studyTimeApi } from './api/studyTime.api';
import { giftApi } from './api/gift.api';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [courseApi.reducerPath],
};

const middlewares = [
    userApi.middleware,
    courseApi.middleware,
    chatApi.middleware,
    commentApi.middleware,
    notificationApi.middleware,
    studyTimeApi.middleware,
    giftApi.middleware,
] as Middleware[];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(middlewares),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default { store, persistor };
