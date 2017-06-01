import {createPattern, selectPattern} from './sequencer/patternActions'

export function init () {
  return (dispatch, getState) => {
    const id = dispatch(createPattern(0))
    dispatch(selectPattern(id))
  }
}
