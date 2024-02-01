import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setToken, clearToken } from "../features/auth/authSlice"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.50.5:5051/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set("Authorization", token)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error && result?.error?.status === 401) {
    let refreshResult = await baseQuery("/auth", api, extraOptions)
    console.log(refreshResult)

    if (refreshResult?.data?.access_token) {
      api.dispatch(setToken(refreshResult.data))

      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const spotifyAuth = createApi({
  reducerPath: "spotifyAuth",
  tagTypes: ["searchResults, playlistResult"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})
