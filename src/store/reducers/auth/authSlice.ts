import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isLoggedIn: false,
    error: null,
    loading: false,
    socialMediaLoading: false,

  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    authStart: state => {
      state.loading = true;
      state.error = null;
    },
    authStartSocailLink: state => {
      state.socialMediaLoading = true;
      state.error = null;
    },
    authFail: (state, action) => {
      state.loading = false;
      state.socialMediaLoading = false;
      state.error = action.payload;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.socialMediaLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    logoutSuccess: state => {
      state.loading = false;
      state.socialMediaLoading = false;
      state.isLoggedIn = false;
      state.user = {};
      state.error = null;
    },
  },
});

export const {setLoading, authStart, authStartSocailLink, authFail, authSuccess, logoutSuccess} =
  authSlice.actions;

export default authSlice.reducer;
