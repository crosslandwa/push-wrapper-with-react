const initialPushState = {
  modifiers: {
    clip: false,
    delete: false,
    shift: false,
    fixedLength: false,
    duplicate: false
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
