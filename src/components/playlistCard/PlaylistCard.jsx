import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addPlaylist, removePlaylist } from "../../features/playlistCart/playlistCartSlice"

export default function PlaylistCard({ playlist }) {
  const selectedPlaylists = useSelector((state) => state.playlistCart.selectedPlaylists)
  const dispatch = useDispatch()

  const togglePlaylist = () => {
    const playlistSelected = selectedPlaylists.find((item) => item.id === playlist.id)

    if (playlistSelected) {
      console.log(playlist.id)
      dispatch(removePlaylist(playlist.id))
    } else {
      dispatch(addPlaylist(playlist))
    }
  }

  return (
    <div onClick={() => togglePlaylist()} className={`w-[240px] h-full`}>
      <div
        className={`border-4 bg-grey-mid-1 p-2 rounded-lg drop-shadow-sm cursor-pointer h-full ${
          selectedPlaylists.find((item) => item.id === playlist.id)
            ? "border-blue-light"
            : "border-transparent"
        }`}>
        <div className={``}>
          <img
            src={playlist?.images[0]?.url}
            className={`inset-0 h-full w-full object-cover rounded-md shadow-md`}
          />
        </div>
        <p className={`text-center pt-3 text-blue-light font-semibold truncate`}>
          {playlist?.name}
        </p>
        <p className={`text-center`}>{playlist?.tracks?.total} låtar</p>
      </div>
    </div>
  )
}
