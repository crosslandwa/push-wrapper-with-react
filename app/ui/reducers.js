const initialUiState = {
  selectedVoice: 0
}

export default function push (state = initialUiState, action) {
  switch (action.type) {
    case 'UI_SELECT_VOICE':
      return Object.assign({},
        state,
        { selectedVoice: action.voice }
      )
  }
  return state
}
