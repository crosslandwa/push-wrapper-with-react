const playersByTrackId = {}

export default (store) => (next) => (action) => {
  switch (action.type) {
    case 'REGISTER_PLAYER':
      playersByTrackId[action.trackId] = action.player
      break;
    case 'UNREGISTER_PLAYER':
      delete playersByTrackId[action.trackId]
      break;
  }

  return next(action)
}
