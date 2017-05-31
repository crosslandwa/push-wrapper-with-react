import {createPattern} from './sequencer/patternActions'

export function init () {
  return (dispatch, getState) => {
    dispatch(createPattern(0))
  }
}
