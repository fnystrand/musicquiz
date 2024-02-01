import { useSelector, useDispatch } from "react-redux"
import { setCurrent } from "../../features/global/globalSlice"
import { SpeakerWaveIcon } from "@heroicons/react/24/solid"

export default function QueRow({ track }) {
  const musicPlayer = useSelector((state) => state.global.musicPlayer)
  const dispatch = useDispatch()

  return (
    <div
      className={`${
        musicPlayer.current === track?.id ? "bg-gradient3" : "bg-grey-dark"
      } flex p-2 gap-5 items-center relative z-10 rounded-md max-w-full`}>
      {musicPlayer.playing && musicPlayer.currentlyPlaying === track?.id && (
        <SpeakerWaveIcon
          className={`h-8 w-8 text-blue-mid absolute top-1/2 left-8 -translate-y-1/2 z-20`}
        />
      )}
      <div
        className={`w-[80px] min-w-[80px] rounded-lg drop-shadow-sm`}
        onClick={() => dispatch(setCurrent(track?.id))}>
        <img
          src={track?.album?.images[0]?.url}
          className={`h-full w-full object-cover rounded-md`}
        />
      </div>
      <div className={`max-w-12 `}>
        <div className={`text-md font-semibold text-blue-mid`}>
          {track?.name.replace(/\-.*/, "")}
        </div>
        <div className={`flex gap-2 w-full flex-nowrap flex-col`}>
          {track?.artists?.map((artist, index) => (
            <div className={`text-sm text-ellipsis`} key={index}>
              {artist?.name}
              {index < track?.artists?.length - 1 && ","}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
