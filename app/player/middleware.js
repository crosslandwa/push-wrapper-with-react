const playersByTrackId = {}

export default (store) => (next) => (action) => {
  switch (action.type) {
    case 'REGISTER_PLAYER':
      playersByTrackId[action.trackId] = action.player
      return
    case 'UNREGISTER_PLAYER':
      delete playersByTrackId[action.trackId]
      return
    case 'PLAYER_PLAY':
      playersByTrackId[action.trackId] && playersByTrackId[action.trackId].play(action.playbackData)
      return
  }

  return next(action)
}
