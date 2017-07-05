export function shiftOn () {
  return { type: 'PUSH_SHIFT_ON' }
}

export function shiftOff () {
  return { type: 'PUSH_SHIFT_OFF' }
}

export function deleteOn () {
  return { type: 'PUSH_DELETE_ON' }
}

export function deleteOff () {
  return { type: 'PUSH_DELETE_OFF' }
}

export function clipOff () {
  return { type: 'PUSH_CLIP_OFF' }
}

export function clipOn () {
  return { type: 'PUSH_CLIP_ON' }
}

export function fixedLengthOn () {
  return modifierOn('fixedLength')
}

export function fixedLengthOff () {
  return modifierOff('fixedLength')
}

function modifierOn (modifier) {
  return { type: 'PUSH_MODIFIER_ON', modifier }
}

function modifierOff (modifier) {
  return { type: 'PUSH_MODIFIER_OFF', modifier }
}
