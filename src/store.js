import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { spotifyAuth } from "./services/spotifyAuth"
import authReducer from "@/features/auth/authSlice"
import searchReducer from "@/features/search/searchSlice"
import globalReducer from "@/features/global/globalSlice"
import playlistCartReducer from "@/features/playlistCart/playlistCartSlice"
import { sonosApi } from "./services/sonos"

export const store = configureStore({
  reducer: {
    [spotifyAuth.reducerPath]: spotifyAuth.reducer,
    [sonosApi.reducerPath]: sonosApi.reducer,
    auth: authReducer,
    search: searchReducer,
    global: globalReducer,
    playlistCart: playlistCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([spotifyAuth.middleware, sonosApi.middleware]),
})

setupListeners(store.dispatch)
