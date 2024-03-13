import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: { connected: true, isAdmin: false } };

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectUser(state) {
      state.user.connected = true;
    },
    disconnectUser(state) {
      state.user.connected = false;
    },
  },
});

export const { connectUser, disconnectUser } = UserSlice.actions;
export default UserSlice;
