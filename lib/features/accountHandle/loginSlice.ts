import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  value: boolean;
}

const initialState: LoginState = {
  value: false,
};



export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    Login: (state) => {
      state.value = true;
    },
    Logout: (state) => {

      state.value = false;
    },
    
  },
})

export const { Login, Logout } = loginSlice.actions;
export default loginSlice.reducer;