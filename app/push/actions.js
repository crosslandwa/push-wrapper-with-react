export function shiftOn () {
  return modifierOn('shift')
}

export function shiftOff () {
  return modifierOff('shift')
}

export function deleteOn () {
  return modifierOn('delete')
}

export function deleteOff () {
  return modifierOff('delete')
}

export function clipOff () {
  return modifierOff('clip')
}

export function clipOn () {
  return modifierOn('clip')
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
