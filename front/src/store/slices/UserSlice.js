import { createSlice } from '@reduxjs/toolkit';

// Slice permettant de gérer le state de l'utilisateur

const initialState = JSON.parse(localStorage.getItem('user')) || {
  user: { connected: false, isAdmin: false },
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectUser(state, action) {
      const user = action.payload;
      state.user.connected = true;
      state.user.profil = user;
      if (user.role.includes('admin')) {
        state.user.isAdmin = true;
      } else {
        state.user.isAdmin = false;
      }
    },
    disconnectUser(state) {
      state.user.connected = false;
      state.user.isAdmin = false;
      if (state.user.profil) {
        state.user.profil = {};
      }
    },
  },
});

export const { connectUser, disconnectUser } = UserSlice.actions;
export default UserSlice;
