import { combineReducers } from 'redux'
import push from '../push/reducers'
import sequencer from '../sequencer/reducers'
import ui from '../ui/reducers'
import voices from '../voices/reducers'
import steps from '../sequencer/stepsreducers'
import patterns from '../sequencer/patternreducers'
import tracks from '../sequencer/trackreducers'

function scratch (state = {}, action) {
  switch (action.type) {
    case 'PATTERN_SELECT':
      return action.scratch
  }
  return state
}

export default combineReducers({
  push,
  sequencer,
  ui,
  voices,
  scratch,
  entities: combineReducers({
    patterns,
    steps,
    tracks
  })
})
