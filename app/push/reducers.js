const initialPushState = {
  modifiers: {
    shift: false
  }
}

export default function push (state = initialPushState, action) {
  switch (action.type) {
    case 'PUSH_SHIFT_ON':
      return Object.assign({},
        state,
        {modifiers: Object.assign({}, state.modifiers, {shift: true})}
      )
    case 'PUSH_SHIFT_OFF':
      return Object.assign({},
        state,
        {modifiers: Object.assign({}, state.modifiers, {shift: false})}
      )
  }
  return state
}
