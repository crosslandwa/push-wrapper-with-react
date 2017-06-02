const initialUiState = {
  selectedTrackId: null
}

export default function push (state = initialUiState, action) {
  switch (action.type) {
    case 'UI_SELECT_TRACK':
      return Object.assign({},
        state,
        { selectedTrackId: action.trackId }
      )
  }
  return state
}
