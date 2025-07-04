import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
}

const initialState: UiState = {
  sidebarOpen: true,
  theme: 'light',
  loading: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { toggleSidebar, setSidebarOpen, toggleTheme, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
