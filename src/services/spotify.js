import { spotifyAuth } from "./spotifyAuth"

export const spotifyApi = spotifyAuth.injectEndpoints({
  endpoints: (build) => ({
    searchPlaylist: build.mutation({
      query: (searchTerm) => ({
        url: `/SearchPlaylists`,
        method: "POST",
        body: {
          searchQuery: searchTerm,
          type: "playlist",
          limit: 20,
        },
      }),
      providesTags: ["searchResults"],
    }),
    GetPlaylists: build.mutation({
      query: (playlistIds) => ({
        url: `/GetPlaylists`,
        method: "POST",
        body: playlistIds,
      }),
      providesTags: ["playlistResult"],
    }),
  }),
})

export const { useSearchPlaylistMutation, useGetPlaylistsMutation } = spotifyApi
