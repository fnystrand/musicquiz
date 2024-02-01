import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  navbar: {
    searchOpen: false,
    playlistOpen: false,
    playersOpen: false,
    anyOpen: false,
  },
  tracks: JSON.parse(localStorage.getItem("tracks"))
    ? JSON.parse(localStorage.getItem("tracks"))
    : [],
  musicPlayer: {
    current: JSON.parse(localStorage.getItem("current"))
      ? JSON.parse(localStorage.getItem("current"))
      : null,
    prev: JSON.parse(localStorage.getItem("prev"))
      ? JSON.parse(localStorage.getItem("prev"))
      : null,
    next: JSON.parse(localStorage.getItem("next"))
      ? JSON.parse(localStorage.getItem("next"))
      : null,
    playing: false,
    currentlyPlaying: null,
    volume: 10,
    counting: false,
    timer: 0,
  },
  players: JSON.parse(localStorage.getItem("players"))
    ? JSON.parse(localStorage.getItem("players"))
    : [],
  editing: {
    score: false,
    player: null,
  },
}

const clearMusicPlayer = (musicPlayer) => {
  musicPlayer.current = null
  localStorage.removeItem("current")

  musicPlayer.prev = null
  localStorage.removeItem("prev")

  musicPlayer.next = null
  localStorage.removeItem("next")
}

const closeAllInNavbar = (state) => {
  state.navbar = {
    ...state.navbar,
    searchOpen: false,
    playlistOpen: false,
    playersOpen: false,
    anyOpen: false,
  }
}

const setCurrentAction = (state, trackId) => {
  state.musicPlayer.current = trackId

  localStorage.setItem("current", JSON.stringify(trackId))

  const index = state.tracks.findIndex((track) => track.id === trackId)

  if (index + 1 > state.tracks.length) {
    //No next
    state.musicPlayer.next = null
    localStorage.removeItem("next")
  } else {
    //Set next
    state.musicPlayer.next = state.tracks[index + 1].id
    localStorage.setItem("next", JSON.stringify(state.tracks[index + 1].id))
  }

  if (index - 1 < 0) {
    //No prev
    state.musicPlayer.prev = null
    localStorage.removeItem("prev")
  } else {
    //Set prev
    state.musicPlayer.prev = state.tracks[index - 1].id
    localStorage.setItem("prev", JSON.stringify(state.tracks[index - 1].id))
  }
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleSearchOpen: (state, { payload = false }) => {
      if (state.navbar.searchOpen || payload) {
        state.navbar.searchOpen = false
        state.navbar.anyOpen = false
      } else {
        state.navbar = {
          ...state.navbar,
          searchOpen: true,
          playlistOpen: false,
          playersOpen: false,
          anyOpen: true,
        }
      }
    },
    togglePlaylistOpen: (state, { payload = false }) => {
      if (state.navbar.playlistOpen || payload) {
        state.navbar.playlistOpen = false
        state.navbar.anyOpen = false
      } else {
        state.navbar = {
          ...state.navbar,
          searchOpen: false,
          playlistOpen: true,
          playersOpen: false,
          anyOpen: true,
        }
      }
    },
    togglePlayersOpen: (state, { payload = false }) => {
      if (state.navbar.playersOpen || payload) {
        state.navbar.playersOpen = false
        state.navbar.anyOpen = false
      } else {
        state.navbar = {
          ...state.navbar,
          searchOpen: false,
          playlistOpen: false,
          playersOpen: true,
          anyOpen: true,
        }
      }
    },
    closeAll: (state) => {
      state.navbar = {
        ...state.navbar,
        searchOpen: false,
        playlistOpen: false,
        playersOpen: false,
        anyOpen: false,
      }
      state.editing.player = null
    },
    addTracks: (state, { payload }) => {
      const tracksToAdd = []

      payload.forEach((playlist) => {
        playlist?.tracks?.items?.forEach((trackItem) => {
          let exists = tracksToAdd.find(
            (existingTrack) => existingTrack?.id === trackItem?.track?.id
          )

          if (!exists) {
            tracksToAdd.push(trackItem?.track)
          }
        })
      })

      let shuffled = tracksToAdd
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

      state.tracks = [...shuffled]
      localStorage.setItem("tracks", JSON.stringify(state.tracks))

      setCurrentAction(state, state.tracks[0]?.id)
    },
    clearTracks: (state) => {
      state.tracks = []
      clearMusicPlayer(state.musicPlayer)
      localStorage.removeItem("tracks")
    },
    setCurrent: (state, { payload }) => {
      setCurrentAction(state, payload)
    },
    setCurrentlyPlaying: (state, { payload }) => {
      state.musicPlayer.currentlyPlaying = payload
      state.musicPlayer.playing = true
    },
    setPlaying: (state, { payload }) => {
      state.musicPlayer.playing = payload
    },
    addPlayer: (state, { payload }) => {
      state.players.push(payload)
      localStorage.setItem("players", JSON.stringify(state.players))
    },
    updatePlayer: (state, { payload }) => {
      state.players[payload.index].name = payload.name
      state.players[payload.index].team = payload.team
      state.editing.player = null
      closeAllInNavbar(state)

      localStorage.setItem("players", JSON.stringify(state.players))
    },
    removePlayer: (state, { payload }) => {
      state.players.splice(payload, 1)

      state.editing.player = null
      closeAllInNavbar(state)
      localStorage.setItem("players", JSON.stringify(state.players))
    },
    setEditingPlayer: (state, { payload }) => {
      state.editing.player = `${payload}`
      closeAllInNavbar(state)
      state.navbar.playersOpen = true
      state.navbar.anyOpen = true
    },
    updateScore: (state, { payload }) => {
      state.players[payload.index].score += payload.score
      if (state.players[payload.index].score <= 0) {
        state.players[payload.index].score = 0
      }
      localStorage.setItem("players", JSON.stringify(state.players))
    },
    toggleEditingScore: (state) => {
      state.editing.score = !state.editing.score
    },
    setTime: (state, { payload }) => {
      state.musicPlayer.timer = payload
    },
    decTime: (state) => {
      state.musicPlayer.timer -= 1
    },
    toggleCounting: (state) => {
      state.musicPlayer.counting = !state.musicPlayer.counting
    },
  },
})

export const {
  toggleSearchOpen,
  togglePlaylistOpen,
  togglePlayersOpen,
  addTracks,
  closeAll,
  clearTracks,
  setCurrent,
  addPlayer,
  updateScore,
  toggleEditingScore,
  setEditingPlayer,
  updatePlayer,
  removePlayer,
  setCurrentlyPlaying,
  setPlaying,
  setTime,
  decTime,
  toggleCounting,
} = globalSlice.actions
export default globalSlice.reducer
