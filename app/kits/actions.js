import { kitIds } from '../selectors'

export function createKit (voiceIds) {
  return (dispatch, getState) => {
    const id = `kit-${kitIds(getState()).length}`
    dispatch({ type: 'KIT_CREATE', id, voiceIds })
    return id
  }
}
