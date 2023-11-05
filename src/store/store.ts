import {configureStore} from '@reduxjs/toolkit';
import authreducer from './reducers/auth/authSlice';

const store = configureStore({
    reducer: {
        // Define your reducers here
        auth: authreducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
