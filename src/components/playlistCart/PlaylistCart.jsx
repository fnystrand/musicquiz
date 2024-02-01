import CartRow from "../cartRow/CartRow"
import Dropdown from "../dropdown/Dropdown"
import { useSelector, useDispatch } from "react-redux"
import Button from "@/components/button/Button.jsx"
import { useAnimationControls, motion } from "framer-motion"
import { useEffect } from "react"
import { useGetPlaylistsMutation } from "../../services/spotify"
import { addTracks } from "../../features/global/globalSlice"

export default function PlaylistCart() {
  const playlists = useSelector((state) => state.playlistCart.selectedPlaylists)
  const playlistOpen = useSelector((state) => state.global.navbar.playlistOpen)
  const anyOpen = useSelector((state) => state.global.navbar.anyOpen)
  const playlistIds = useSelector((state) => state.playlistCart.playlistIds)
  const controls = useAnimationControls()
  const dispatch = useDispatch()
  const [getPlaylists, { data: playlistsResponse, isSuccess: getPlaylistSuccess }] =
    useGetPlaylistsMutation()

  const variants = {
    closed: {
      y: `-${10 * (playlists?.length > 2 ? playlists?.length : 3)}rem`,
    },
    open: {
      y: "0",
    },
  }

  useEffect(() => {
    if (playlistOpen && playlists?.length > 0) {
      controls.start("open")
    } else {
      controls.start("closed")
    }
  }, [playlistOpen, playlists, anyOpen])

  useEffect(() => {
    if (playlistsResponse) {
      dispatch(addTracks(playlistsResponse))
    }
  }, [playlistsResponse])

  return (
    <motion.div
      variants={variants}
      transition={{
        ease: "easeInOut",
      }}
      initial={"closed"}
      animate={controls}
      className={`relative z-40`}>
      <Dropdown variants={variants} controls={controls} initial={"closed"}>
        <div className={`flex flex-col gap-5`}>
          {playlists.map((item, index) => (
            <CartRow item={item} key={index} />
          ))}
          {playlists.length > 0 && (
            <div className={`text-center`}>
              <Button text={"Lägg till"} onClick={() => getPlaylists(playlistIds)} />
            </div>
          )}
        </div>
      </Dropdown>
    </motion.div>
  )
}
