import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"
import Home from "@/pages/home/Home"
import Game from "@/pages/game/Game"
import Navbar from "@/components/navbar/Navbar"
import Search from "@/components/search/Search"
import PlaylistCart from "@/components/playlistCart/PlaylistCart"
import Overlay from "@/components/overlay/Overlay"
import PlayerForm from "./components/playerForm/PlayerForm"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Route>
  )
)

function App() {
  return (
    <div className={`app bg-gradient relative`}>
      <Navbar />
      <Search />
      <PlaylistCart />
      <PlayerForm />
      <Overlay />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
