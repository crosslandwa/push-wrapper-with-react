const initialPushState = {
  modifiers: {
    delete: false,
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
  }
  return state
}
