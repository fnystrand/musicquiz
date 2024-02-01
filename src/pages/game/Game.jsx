import Intervals from "../../components/intervals/Intervals"
import PlayersList from "../../components/playersList/PlayersList"
import TrackDisplay from "../../components/trackDisplay/TrackDisplay"
import TracksQue from "../../components/tracksQue/TracksQue"

export default function Game() {
  return (
    <div className={`p-5`}>
      <div className={`flex`}>
        <PlayersList />
        <div className={`flex-1 flex flex-col  justify-between items-center`}>
          <TrackDisplay />
          <Intervals />
        </div>
        <TracksQue />
      </div>
    </div>
  )
}
