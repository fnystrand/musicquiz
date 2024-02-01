import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import QueRow from "../queRow/QueRow"
import styles from "./TracksQue.module.css"
import { TrashIcon } from "@heroicons/react/24/solid"
import { clearTracks } from "../../features/global/globalSlice"
import { useNavigate } from "react-router-dom"

export default function TracksQue() {
  const tracks = useSelector((state) => state.global.tracks)
  const [getWidth, setWidth] = useState(window.innerWidth)
  const [getHeight, setHeight] = useState(window.innerHeight)
  const gapFromBottom = 170
  const dispatch = useDispatch()
  const nav = useNavigate()

  function resize() {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
    resize()

    return function cleanup() {
      window.removeEventListener("resize", resize)
    }
  }, [])

  useEffect(() => {
    if (tracks?.length === 0) {
      nav("/")
    }
  }, [tracks])

  return (
    <div className={`flex-0 min-w-[21rem] w-[21rem] select-none`}>
      <div
        className={`bg-grey-dark rounded-t-lg p-5 text-blue-mid text-xl font-semibold text-center relative`}>
        <div
          className={`absolute top-5 right-5 cursor-pointer`}
          onClick={() => dispatch(clearTracks())}>
          <TrashIcon className={`h-6 w-6 text-red-mid`} />
        </div>
        Låtkö ({tracks?.length}st)
      </div>
      <div
        className={`bg-black-half p-5 rounded-b-lg flex flex-col gap-5 overflow-x-hidden overflow-y-auto scrollbar`}
        style={{ height: `${(getHeight - gapFromBottom) / 16}rem` }}>
        {tracks?.map((track, index) => (
          <QueRow track={track} key={index} />
        ))}
      </div>
    </div>
  )
}
