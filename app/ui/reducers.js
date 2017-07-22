const initialUiState = {
  selectedTrackId: null,
  sampleSelectionOn: false
}

export default function push (state = initialUiState, action) {
  switch (action.type) {
    case 'UI_SELECT_TRACK':
      return Object.assign({},
        state,
        { selectedTrackId: action.trackId }
      )
    case 'UI_SAMPLE_SELECT_START':
    case 'UI_SAMPLE_SELECT_STOP':
    return Object.assign({},
      state,
      { sampleSelectionOn: action.type === 'UI_SAMPLE_SELECT_START' }
    )
  }
  return state
}
