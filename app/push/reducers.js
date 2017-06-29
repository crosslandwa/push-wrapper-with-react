const initialPushState = {
  modifiers: {
    clip: false,
    del: false,
    shift: false
  }
}

export default function push (state = initialPushState, { type }) {
  switch (type) {
    case 'PUSH_SHIFT_ON':
    case 'PUSH_SHIFT_OFF':
      return Object.assign({},
        state,
        {modifiers: Object.assign({}, state.modifiers, {shift: type === 'PUSH_SHIFT_ON'})}
      )
    case 'PUSH_DELETE_ON':
    case 'PUSH_DELETE_OFF':
      return Object.assign({},
        state,
        {modifiers: Object.assign({}, state.modifiers, {delete: type === 'PUSH_DELETE_ON'})}
      )
    case 'PUSH_CLIP_ON':
    case 'PUSH_CLIP_OFF':
      return Object.assign({},
        state,
        {modifiers: Object.assign({}, state.modifiers, {clip: type === 'PUSH_CLIP_ON'})}
      )
  }
  return state
}
