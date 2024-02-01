import { TrashIcon } from "@heroicons/react/24/solid"
import { useDispatch } from "react-redux"
import { removePlaylist } from "../../features/playlistCart/playlistCartSlice"

export default function CartRow({ item }) {
  const dispatch = useDispatch()
  return (
    <div className={`bg-grey-mid-1 flex p-2 gap-5 items-center relative z-10 rounded-md`}>
      <div className={` w-[100px] rounded-lg drop-shadow-sm`}>
        <img src={item?.images[0]?.url} className={`h-full w-full object-cover rounded-md`} />
      </div>
      <div className={`w-full`}>
        <div className={`text-lg font-semibold text-blue-mid`}>{item?.name}</div>
        <div>{item?.tracks?.total} låtar</div>
      </div>
      <div className={`p-5 cursor-pointer`} onClick={() => dispatch(removePlaylist(item?.id))}>
        <TrashIcon className={`h-6 w-6 text-red-mid`} />
      </div>
    </div>
  )
}
