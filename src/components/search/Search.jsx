import { useEffect, useState } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useSearchPlaylistMutation } from "@/services/spotify"
import { useDispatch, useSelector } from "react-redux"
import { setResults } from "@/features/search/searchSlice"
import SearchResultsCarousel from "@/components/searchResultsCarousel/SearchResultsCarousel"
import Button from "@/components/button/Button"
import { motion, useAnimationControls } from "framer-motion"
import { toggleSearchOpen } from "../../features/global/globalSlice"

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchPlaylist, { data: searchResponse, isSuccess: searchSuccess }] =
    useSearchPlaylistMutation()
  const dispatch = useDispatch()
  const searchOpen = useSelector((state) => state.global.navbar.searchOpen)
  const hasResults = useSelector((state) => state.search.hasResults)
  const drawerControls = useAnimationControls()

  const drawerVariants = {
    closed: {
      y: "-8rem",
      height: "8rem",
    },
    closedFull: {
      y: "-33rem",
      height: "33rem",
    },
    open: {
      y: "0",
      height: "6.5rem",
    },
    openFull: {
      y: "0",
      height: "33rem",
    },
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      searchPlaylist(searchTerm)
    }
  }

  useEffect(() => {
    if (searchResponse) {
      console.log(searchResponse?.playlists?.items)
      dispatch(setResults(searchResponse?.playlists?.items))
    }
  }, [searchResponse])

  useEffect(() => {
    if (searchOpen) {
      drawerControls.start(hasResults ? "openFull" : "open")
    } else {
      drawerControls.start(hasResults ? "closedFull" : "closed")
    }
  }, [searchOpen, hasResults])

  return (
    <div className={`relative flex flex-col items-center z-[50]`}>
      <motion.div
        className={`drawer bg-grey-dark pb-10 rounded-b-[4rem] absolute w-full`}
        variants={drawerVariants}
        transition={{
          ease: "easeInOut",
        }}
        initial={"closed"}
        animate={drawerControls}>
        <div className={`container px-5 pt-5 pb-6`}>
          <div className="relative">
            <form onSubmit={(e) => onSubmit(e)}>
              <input
                className="h-16 text-blue-mid w-full rounded-lg border-none bg-grey-mid-1 text-lg drop-shadow-sm text-center"
                id="search"
                type="search"
                placeholder="Sök spellista"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button
                type="submit"
                className="absolute start-1 bg-grey-mid-2 h-full -translate-x-[4px] rounded-l-lg top-1/2 -translate-y-1/2 bg-gray-50 px-5">
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className={`h-8 w-8 text-blue-mid`} />
              </button>
            </form>
          </div>
        </div>
        <SearchResultsCarousel />
      </motion.div>
    </div>
  )
}
