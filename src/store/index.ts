import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';
import authSlice from './slices/authSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
