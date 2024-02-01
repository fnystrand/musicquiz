import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token"))
    : null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.access_token

      localStorage.setItem("token", JSON.stringify(action.payload.access_token))
    },
    clearToken: (state) => {
      state.token = ""
    },
  },
})

export const { setToken, clearToken } = authSlice.actions
export default authSlice.reducer
