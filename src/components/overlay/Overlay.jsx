import { useDispatch, useSelector } from "react-redux"
import { closeAll } from "../../features/global/globalSlice"
import { toggleEditingScore } from "../../features/global/globalSlice"

export default function Overlay() {
  const dispatch = useDispatch()
  const anyOpen = useSelector((state) => state.global.navbar.anyOpen)
  const editingScore = useSelector((state) => state.global.editing.score)
  return (
    <>
      {anyOpen && (
        <div
          className={`bg-black-half w-full h-full absolute z-30`}
          onClick={() => dispatch(closeAll())}></div>
      )}
      {editingScore && (
        <div
          className={`bg-black-half w-full h-full absolute z-30`}
          onClick={() => dispatch(toggleEditingScore())}></div>
      )}
    </>
  )
}
