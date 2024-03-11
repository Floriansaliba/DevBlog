import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: { connected: true, isAdmin: true } };

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectUser(state) {
      state.user.connected = true;
    },
  },
});

export const { connectUser } = UserSlice.actions;
export default UserSlice;
