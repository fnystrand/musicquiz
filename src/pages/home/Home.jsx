import Logo from "@/assets/logo2.svg?react"
import Button from "@/components/button/Button.jsx"
import { useGetPlaylistsMutation } from "../../services/spotify"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { addTracks } from "../../features/global/globalSlice"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [getPlaylists, { data: playlists, isSuccess: getPlaylistSuccess }] =
    useGetPlaylistsMutation()
  const playlistIds = useSelector((state) => state.playlistCart.playlistIds)
  const tracks = useSelector((state) => state.global.tracks)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (playlists) {
      dispatch(addTracks(playlists))
    }
  }, [playlists])

  useEffect(() => {
    if (tracks?.length > 0) {
      navigate("/game")
    }
  }, [tracks])

  return (
    <div className={`flex flex-col items-center`}>
      <div className={`w-full flex justify-center items-center mt-24`}>
        <Logo className={`w-[32rem]`} />
      </div>
      <div className={`text-4xl text-center my-24`}>
        Välj ut några roliga spellistor,
        <br />
        och låt tävlingen börja!
      </div>
      <Button text={"Spela"} onClick={() => getPlaylists(playlistIds)} />
    </div>
  )
}
