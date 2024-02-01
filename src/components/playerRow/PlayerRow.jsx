import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  toggleEditingScore,
  setEditingPlayer,
  updateScore,
} from "../../features/global/globalSlice"
export default function PlayerRow({ player, index }) {
  const [popupOpen, setPopupOpen] = useState(false)
  const dispatch = useDispatch()
  const editing = useSelector((state) => state.global.editing.score)

  const openEditScore = () => {
    setPopupOpen(true)
    dispatch(toggleEditingScore())
  }

  const closeEditScore = () => {
    setPopupOpen(false)
    dispatch(toggleEditingScore())
  }

  const addScore = (index, score) => {
    dispatch(updateScore({ index, score }))
    closeEditScore()
  }

  useEffect(() => {
    if (!editing) {
      setPopupOpen(false)
    }
  }, [editing])

  return (
    <>
      <div className={`relative z-30`}>
        {popupOpen && (
          <div className={`bg-grey-dark absolute left-0 top-0 p-2 flex text-grey-light rounded-lg`}>
            <div
              className={`py-2 px-5 bg-grey-mid-1 rounded-l-lg text-lg font-bold flex justify-center items-center cursor-pointer select-none`}
              onClick={() => dispatch(updateScore({ index, score: -1 }))}>
              -
            </div>
            <div
              className={`py-2 px-5 bg-grey-mid-2 text-lg font-bold flex justify-center items-center cursor-pointer select-none`}
              onClick={() => addScore(index, 1)}>
              1
            </div>
            <div
              className={`py-2 px-5 bg-grey-mid-1 text-lg font-bold flex justify-center items-center cursor-pointer select-none`}
              onClick={() => addScore(index, 2)}>
              2
            </div>
            <div
              className={`py-2 px-5 bg-grey-mid-2 text-lg font-bold flex justify-center items-center cursor-pointer select-none`}
              onClick={() => addScore(index, 3)}>
              3
            </div>
            <div
              className={`py-2 px-5 bg-grey-mid-1 text-lg font-bold flex justify-center items-center cursor-pointer select-none rounded-r-lg `}
              onClick={() => addScore(index, 4)}>
              4
            </div>
          </div>
        )}
      </div>
      <div className={`flex justify-between font-bold text-xl`}>
        <div className={`cursor-pointer`} onClick={() => dispatch(setEditingPlayer(index))}>
          {player?.name}
        </div>
        <div className={`cursor-pointer`} onClick={openEditScore}>
          {player?.score}
        </div>
      </div>
    </>
  )
}
