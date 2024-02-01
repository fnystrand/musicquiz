import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import PlaylistCard from "../playlistCard/PlaylistCard"
import { register } from "swiper/element/bundle"
import styles from "./SearchResultsCarousel.module.css"

register()

export default function SearchResultsCarousel() {
  const results = useSelector((state) => state.search.searchResults)
  const swiperElRef = useRef(null)

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("progress", (e) => {
      const [swiper, progress] = e.detail
    })

    swiperElRef.current.addEventListener("slidechange", (e) => {})
  }, [])

  return (
    <div className={`px-5 container`}>
      <swiper-container ref={swiperElRef} slides-per-view="5">
        {results.map((playlist, index) => (
          <swiper-slide key={index} className={`${styles.slot}`}>
            <PlaylistCard playlist={playlist} />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  )
}
