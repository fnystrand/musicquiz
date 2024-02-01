import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedPlaylists: JSON.parse(localStorage.getItem("selectedPlaylists"))
    ? JSON.parse(localStorage.getItem("selectedPlaylists"))
    : [],
  playlistIds: JSON.parse(localStorage.getItem("playlistIds"))
    ? JSON.parse(localStorage.getItem("playlistIds"))
    : [],
}

export const playlistCartSlice = createSlice({
  name: "playlistCart",
  initialState,
  reducers: {
    addPlaylist: (state, action) => {
      state.selectedPlaylists.push(action.payload)
      state.playlistIds.push(action.payload.id)

      localStorage.setItem("selectedPlaylists", JSON.stringify(state.selectedPlaylists))
      localStorage.setItem("playlistIds", JSON.stringify(state.playlistIds))
    },
    removePlaylist: (state, action) => {
      state.selectedPlaylists = state.selectedPlaylists.filter((item) => item.id !== action.payload)
      state.playlistIds = state.playlistIds.filter((item) => item !== action.payload)
      localStorage.setItem("selectedPlaylists", JSON.stringify(state.selectedPlaylists))
      localStorage.setItem("playlistIds", JSON.stringify(state.playlistIds))
    },
    clearplaylists: (state) => {
      state.selectedPlaylists = []
      localStorage.removeItem("selectedPlaylists")
      localStorage.removeItem("playlistIds")
    },
  },
})

export const { addPlaylist, removePlaylist, clearplaylists } = playlistCartSlice.actions
export default playlistCartSlice.reducer
