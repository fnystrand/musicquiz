import PlayerRow from "../playerRow/PlayerRow"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function PlayersList() {
  const [getWidth, setWidth] = useState(window.innerWidth)
  const [getHeight, setHeight] = useState(window.innerHeight)
  const gapFromBottom = 170
  const players = useSelector((state) => state.global.players)

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

  const teamExists = (team) => {
    return players.some((player) => player?.team === team)
  }

  const anyFollowingTeam = (team) => {
    if (teamExists(team + 1)) {
      return true
    }

    if (teamExists(team + 2)) {
      return true
    }

    if (teamExists(team + 3)) {
      return true
    }

    return false
  }

  const teamScore = (teamNr) => {
    const totalScore = players
      ?.filter((player) => player?.team === teamNr)
      ?.reduce((prevScore, { score: currentScore }) => {
        return prevScore + currentScore
      }, 0)

    console.log(totalScore)

    return totalScore
  }

  return (
    <div className={`flex-0 min-w-[21rem] w-[21rem]`}>
      <div
        className={`bg-grey-dark rounded-t-lg p-5 text-blue-mid text-xl font-semibold text-center`}>
        Spelare
      </div>
      <div
        className={`bg-black-half p-5 rounded-b-lg flex flex-col gap-5 overflow-y-auto hiddenScroll`}
        style={{ height: `${(getHeight - gapFromBottom) / 16}rem` }}>
        <div className="flex flex-col gap-5 bg-gradient2 bg-clip-text text-transparent">
          {teamExists(1) && (
            <div className={`flex flex-col gap-2`}>
              <div className={`flex justify-between font-black text-2xl`}>
                <div>Team 1</div>
                <div>{teamScore(1)}</div>
              </div>

              <div className={`flex flex-col gap-3`}>
                {players?.map(
                  (player, index) =>
                    player?.team === 1 && <PlayerRow player={player} key={index} index={index} />
                )}
              </div>
              {anyFollowingTeam(1) && <div className={`border-2 border-grey-dark mt-3`}></div>}
            </div>
          )}

          {teamExists(2) && (
            <div className={`flex flex-col gap-2`}>
              <div className={`flex justify-between font-black text-2xl`}>
                <div>Team 2</div>
                <div>{teamScore(2)}</div>
              </div>
              <div className={`flex flex-col gap-3`}>
                {players?.map(
                  (player, index) =>
                    player?.team === 2 && <PlayerRow player={player} key={index} index={index} />
                )}
              </div>
              {anyFollowingTeam(2) && <div className={`border-2 border-grey-dark mt-3`}></div>}
            </div>
          )}

          {teamExists(3) && (
            <div className={`flex flex-col gap-2`}>
              <div className={`flex justify-between font-black text-2xl`}>
                <div>Team 3</div>
                <div>{teamScore(3)}</div>
              </div>
              <div className={`flex flex-col gap-3`}>
                {players?.map(
                  (player, index) =>
                    player?.team === 3 && <PlayerRow player={player} key={index} index={index} />
                )}
              </div>
              {anyFollowingTeam(3) && <div className={`border-2 border-grey-dark mt-3`}></div>}
            </div>
          )}

          {teamExists(4) && (
            <div className={`flex flex-col gap-2`}>
              <div className={`flex justify-between font-black text-2xl`}>
                <div>Team 4</div>
                <div>{teamScore(4)}</div>
              </div>
              <div className={`flex flex-col gap-3`}>
                {players?.map(
                  (player, index) =>
                    player?.team === 4 && <PlayerRow player={player} key={index} index={index} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
