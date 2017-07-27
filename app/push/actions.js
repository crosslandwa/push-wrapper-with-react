export const shiftOn = () => modifierOn('shift')
export const shiftOff = () => modifierOff('shift')
export const deleteOn = () => modifierOn('delete')
export const deleteOff = () => modifierOff('delete')
export const clipOff = () => modifierOff('clip')
export const clipOn = () => modifierOn('clip')
export const fixedLengthOn = () => modifierOn('fixedLength')
export const fixedLengthOff = () => modifierOff('fixedLength')
export const duplicateOn = () => modifierOn('duplicate')
export const duplicateOff = () => modifierOff('duplicate')

function modifierOn (modifier) {
  return { type: 'PUSH_MODIFIER_ON', modifier }
}

function modifierOff (modifier) {
  return { type: 'PUSH_MODIFIER_OFF', modifier }
}
