import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCurrentlyPlaying, setPlaying } from "../features/global/globalSlice"

export const sonosApi = createApi({
  reducerPath: "sonosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.50.5:5005/Vardagsrum" }),
  endpoints: (builder) => ({
    playTrackOnSpotify: builder.mutation({
      query: (spotifyId) => ({
        url: `/spotify/now/spotify:track:${spotifyId}`,
        method: "GET",
      }),
      async onCacheEntryAdded(spotifyId, { dispatch }) {
        dispatch(setCurrentlyPlaying(spotifyId))
      },
      async onQueryStarted(spotifyId, { queryFulfilled }) {
        try {
          const res = await queryFulfilled

          if (res?.data?.status === "success") {
            console.log("play track success")
            dispatch(setCurrentlyPlaying(spotifyId))
          }
        } catch (error) {
          // SET ERROR MSG
        }
      },
    }),
    playSonos: builder.mutation({
      query: () => ({
        url: `/play`,
        method: "GET",
      }),
      async onCacheEntryAdded(args, { dispatch }) {
        //dispatch(setPlaying(true))
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled

          if (res?.data?.status === "success") {
            console.log("play success")
            dispatch(setPlaying(true))
          }
        } catch (error) {
          // SET ERROR MSG
        }
      },
    }),
    pauseSonos: builder.mutation({
      query: () => ({
        url: `/pause`,
        method: "GET",
      }),
      async onCacheEntryAdded(args, { dispatch }) {
        //dispatch(setPlaying(false))
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled

          if (res?.data?.status === "success") {
            console.log("pause success")
            dispatch(setPlaying(false))
          }
        } catch (error) {
          // SET ERROR MSG
        }
      },
    }),
  }),
})

export const { usePlayTrackOnSpotifyMutation, usePlaySonosMutation, usePauseSonosMutation } =
  sonosApi
