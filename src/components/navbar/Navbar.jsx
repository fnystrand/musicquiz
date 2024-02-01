import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { QueueListIcon } from "@heroicons/react/24/solid"
import { UsersIcon } from "@heroicons/react/24/solid"
import { useDispatch, useSelector } from "react-redux"
import {
  togglePlayersOpen,
  toggleSearchOpen,
  togglePlaylistOpen,
} from "../../features/global/globalSlice"
import { useEffect } from "react"

export default function Navbar() {
  const dispatch = useDispatch()
  const selectedPlaylists = useSelector((state) => state.playlistCart.selectedPlaylists)
  const playlistOpen = useSelector((state) => state.global.navbar.playlistOpen)

  useEffect(() => {
    if (selectedPlaylists?.length === 0 && playlistOpen) {
      dispatch(togglePlaylistOpen(true))
    }
  }, [selectedPlaylists, playlistOpen])

  return (
    <div className={` bg-grey-dark relative z-[60]`}>
      <div className={`flex items-center container`}>
        <div className={`flex-1 ml-5 flex start-1`}>
          <div className={`text-center`}>
            <div className={`text-lg text-blue-light`}>Familjens</div>
            <div className={`text-sm text-blue-light`}>Musikquiz</div>
          </div>
        </div>
        <div
          className={`active:bg-grey-mid-1 p-5 flex justify-center cursor-pointer`}
          onClick={() => dispatch(toggleSearchOpen())}>
          <MagnifyingGlassIcon className={`h-6 w-6 text-blue-mid`} />
        </div>
        <div
          className={`active:bg-grey-mid-1 p-5 flex justify-center cursor-pointer`}
          onClick={() => selectedPlaylists?.length > 0 && dispatch(togglePlaylistOpen())}>
          <QueueListIcon className={`h-6 w-6 text-blue-mid`} />
        </div>
        <div
          className={`active:bg-grey-mid-1 p-5 flex justify-center cursor-pointer`}
          onClick={() => dispatch(togglePlayersOpen())}>
          <UsersIcon className={`h-6 w-6 text-blue-mid`} />
        </div>
      </div>
    </div>
  )
}
