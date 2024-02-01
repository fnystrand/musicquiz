import Dropdown from "@/components/dropdown/Dropdown"
import Button from "@/components/button/Button.jsx"
import ButtonSelect from "../buttonSelect/ButtonSelect"
import { useDispatch, useSelector } from "react-redux"
import { useAnimationControls, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { addPlayer, updatePlayer, removePlayer } from "../../features/global/globalSlice"
import { TrashIcon } from "@heroicons/react/24/solid"

export default function PlayerForm() {
  const players = useSelector((state) => state.global.players)
  const playersOpen = useSelector((state) => state.global.navbar.playersOpen)
  const editingPlayer = useSelector((state) => state.global.editing.player)
  const controls = useAnimationControls()
  const [name, setName] = useState("")
  const [active, setActive] = useState(1)
  const dispatch = useDispatch()

  const variants = {
    closed: {
      y: `-${10 * (players?.length > 2 ? players?.length : 3)}rem`,
    },
    open: {
      y: "0",
    },
  }

  useEffect(() => {
    if (playersOpen) {
      controls.start("open")
    } else {
      controls.start("closed")
    }
  }, [playersOpen])

  useEffect(() => {
    if (editingPlayer) {
      setName(players[editingPlayer]?.name)
      setActive(players[editingPlayer]?.team)
    }
  }, [editingPlayer])

  const onSubmit = (e) => {
    e.preventDefault()
    const playerExists = players.find((pl) => pl.name.toLowerCase() === name.toLowerCase())

    if (!playerExists && !editingPlayer) {
      dispatch(addPlayer({ name, team: active, score: 0 }))
    }

    if (editingPlayer) {
      if (playerExists) {
        dispatch(
          updatePlayer({ name: players[editingPlayer].name, team: active, index: editingPlayer })
        )
      } else {
        dispatch(updatePlayer({ name, team: active, index: editingPlayer }))
      }
      setActive(1)
    }

    setName("")
  }

  const rmPlayer = () => {
    dispatch(removePlayer(editingPlayer))
    setName("")
    setActive(1)
  }

  return (
    <motion.div
      variants={variants}
      transition={{
        ease: "easeInOut",
      }}
      initial={"closed"}
      animate={controls}
      className={`relative z-40`}>
      <Dropdown>
        <div className={`flex flex-col gap-5`}>
          <form
            action="submit"
            className={`flex flex-col gap-5 items-center`}
            onSubmit={(e) => onSubmit(e)}>
            <input
              className="h-16 text-blue-mid w-full rounded-lg border-none bg-grey-mid-1 text-lg drop-shadow-sm text-center"
              id="name"
              type="text"
              placeholder="Namn"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <div>Team</div>
            <ButtonSelect amount={4} setActive={setActive} active={active} />
            <div className={`flex gap-2`}>
              {editingPlayer && (
                <Button
                  className={`bg-red-mid`}
                  icon={<TrashIcon className={`h-6 w-6 text-grey-dark`} />}
                  onClick={rmPlayer}
                />
              )}
              <Button type="submit" text={editingPlayer ? "Uppdatera" : "Lägg till"} />
            </div>
          </form>
        </div>
      </Dropdown>
    </motion.div>
  )
}
