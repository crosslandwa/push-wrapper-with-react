const initialPushState = {
  modifiers: {
    clip: false,
    del: false,
    shift: false
  }
}

export default function push (state = initialPushState, { modifier, type }) {
  switch (type) {
    case 'PUSH_MODIFIER_ON':
    case 'PUSH_MODIFIER_OFF':
      return Object.assign({},
        state,
        {modifiers: Object.assign({}, state.modifiers, {[modifier]: type === 'PUSH_MODIFIER_ON'})}
      )
  }
  return state
}
