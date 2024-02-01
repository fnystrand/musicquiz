import Button from "@/components/button/Button.jsx"
import { ClockIcon } from "@heroicons/react/24/solid"
import {
  usePlaySonosMutation,
  usePauseSonosMutation,
  usePlayTrackOnSpotifyMutation,
} from "../../services/sonos"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { setTime, toggleCounting, decTime } from "../../features/global/globalSlice"

export default function () {
  const currentlyPlaying = useSelector((state) => state.global.musicPlayer.currentlyPlaying)
  const currentTrack = useSelector((state) => state.global.musicPlayer.current)
  const [playTrackOnSpotify, { isError: isPlayTrackError }] = usePlayTrackOnSpotifyMutation()
  const [pauseSonos] = usePauseSonosMutation()
  const [playSonos, { isError: isPlayError }] = usePlaySonosMutation()
  const { counting, playing } = useSelector((state) => state.global.musicPlayer)
  const dispatch = useDispatch()
  const testing = true

  const playTrackInterval = async (interval) => {
    if (!counting && !playing) {
      const correctTrack = currentlyPlaying === currentTrack
      let hasError

      if (!currentlyPlaying) {
        await playTrackOnSpotify(currentTrack)
          .unwrap()
          .catch((error) => (hasError = error))
        console.log("no current, playing on spotify")
      } else {
        if (!correctTrack) {
          await playTrackOnSpotify(currentTrack)
            .unwrap()
            .catch((error) => (hasError = error))
          console.log("playing new track on spotify")
        } else {
          await playSonos()
            .unwrap()
            .catch((error) => (hasError = error))
          console.log("playing current track")
        }
      }

      dispatch(setTime(interval))
      if (hasError && !testing) {
        console.log("failed to play")
        return
      }
      if (interval > 0) {
        dispatch(toggleCounting())
        console.log("waiting to pause")
        const i = setInterval(() => {
          dispatch(decTime())
        }, 1000)

        setTimeout(() => {
          pauseSonos()
          console.log("track paused")
          clearInterval(i)
          dispatch(toggleCounting())
        }, [interval * 1000])
      }
    }
  }

  return (
    <div className={`h-full w-full flex justify-center items-center`}>
      <div className={`h-20 w-full flex items-center gap-5 px-5`}>
        <Button
          className={`w-1/6 h-full`}
          bgColor={playing ? "bg-black-half" : "bg-pink-mid"}
          textColor={playing ? "text-grey-mid-2" : "text-white"}
          text={"10s"}
          onClick={() => playTrackInterval(10)}
        />
        <Button
          className={`w-2/6 h-full`}
          bgColor={playing ? "bg-black-half" : "bg-violet-mid"}
          textColor={playing ? "text-grey-mid-2" : "text-white"}
          text={"20s"}
          onClick={() => playTrackInterval(20)}
        />
        <Button
          className={`w-3/6 h-full`}
          bgColor={playing ? "bg-black-half" : "bg-purple-mid"}
          textColor={playing ? "text-grey-mid-2" : "text-white"}
          text={"40s"}
          onClick={() => playTrackInterval(40)}
        />
      </div>
    </div>
  )
}
