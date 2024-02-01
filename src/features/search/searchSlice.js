import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchResults: [],
  hasResults: false
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.searchResults = action.payload
      state.hasResults = true
    },
    clearResults: (state) => {
      state = initialState
      state.hasResults = false
    },
  },
})

export const { setResults, clearResults } = searchSlice.actions
export default searchSlice.reducer
