const initialUiState = {
  selectedVoiceId: null
}

export default function push (state = initialUiState, action) {
  switch (action.type) {
    case 'UI_SELECT_VOICE':
      return Object.assign({},
        state,
        { selectedVoiceId: action.voiceId }
      )
  }
  return state
}
