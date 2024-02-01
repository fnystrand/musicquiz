import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid"
import { setCurrent } from "../../features/global/globalSlice"
import {
  usePlayTrackOnSpotifyMutation,
  usePauseSonosMutation,
  usePlaySonosMutation,
} from "../../services/sonos"

export default function TrackDisplay() {
  const tracks = useSelector((state) => state.global.tracks)
  const musicPlayer = useSelector((state) => state.global.musicPlayer)
  const [currentTrack, setCurrentTrack] = useState(null)
  const dispatch = useDispatch()
  const [playTrackOnSpotify, { data: playTrackResponse, isSuccess: playTrackSuccess }] =
    usePlayTrackOnSpotifyMutation()
  const [pauseSonos, { data: pauseResponse, isSuccess: pauseSuccess }] = usePauseSonosMutation()
  const [playSonos, { data: playResponse, isSuccess: playSuccess }] = usePlaySonosMutation()

  useEffect(() => {
    setCurrentTrack(tracks?.find((track) => track.id === musicPlayer.current))
  }, [tracks, musicPlayer])

  return (
    <div className={`flex items-center gap-5`}>
      <div className={`pl-5`}>
        <ChevronLeftIcon
          className={`h-24 w-24 cursor-pointer ${
            musicPlayer.prev ? "text-blue-mid" : "text-grey-mid-1"
          } -translate-y-[2.5rem]`}
          onClick={() => musicPlayer.prev && dispatch(setCurrent(musicPlayer.prev))}
        />
      </div>
      <div className={`flex flex-col gap-5 select-none`}>
        <div className={`bg-black-half p-5 rounded-lg relative`}>
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient5 rounded-full w-[8rem] aspect-square flex items-center justify-center`}>
            {musicPlayer.counting ? (
              <div className={`text-6xl drop-shadow-md`}>{musicPlayer.timer}</div>
            ) : musicPlayer.playing && musicPlayer.currentlyPlaying === currentTrack?.id ? (
              <PauseIcon
                className={`h-24 w-24 text-blue-mid cursor-pointer`}
                onClick={() => pauseSonos()}
              />
            ) : (
              <PlayIcon
                className={`h-24 w-24 text-blue-mid translate-x-1 cursor-pointer`}
                onClick={() =>
                  currentTrack?.id === musicPlayer.currentlyPlaying
                    ? playSonos()
                    : playTrackOnSpotify(musicPlayer.current)
                }
              />
            )}
          </div>
          <img
            src={currentTrack?.album?.images[0]?.url}
            className={`inset-0 h-full w-full object-cover rounded-md shadow-md`}
          />
        </div>
        <div className={` bg-black-half p-2 rounded-lg `}>
          <div
            className={`bg-gradient4 w-full h-full bg-clip-text text-transparent flex gap-1 justify-center text-xl font-bold flex-col`}>
            <div className={`flex justify-center`}>
              {currentTrack?.artists?.map((artist, index) => (
                <div key={index}>
                  {artist?.name}
                  {index < currentTrack?.artists?.length - 1 && ", "}
                </div>
              ))}
            </div>
            <div className={`text-center`}>{currentTrack?.name?.replace(/\-.*/, "")}</div>
          </div>
        </div>
      </div>
      <div className={`pr-5`}>
        <ChevronRightIcon
          className={`h-24 w-24 text-blue-mid -translate-y-[2.5rem] cursor-pointer`}
          onClick={() => dispatch(setCurrent(musicPlayer.next))}
        />
      </div>
    </div>
  )
}
