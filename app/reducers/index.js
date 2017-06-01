import { combineReducers } from 'redux'
import push from '../push/reducers'
import sequencer from '../sequencer/reducers'
import ui from '../ui/reducers'
import oldVoices from '../voices/oldreducers'
import samples from '../voices/samplereducers'
import steps from '../sequencer/stepsreducers'
import patterns from '../sequencer/patternreducers'
import tracks from '../sequencer/trackreducers'

function current (state = {}, action) {
  switch (action.type) {
    case 'PATTERN_SELECT':
      return action.current
  }
  return state
}

export default combineReducers({
  push,
  sequencer,
  ui,
  voices: oldVoices,
  current,
  entities: combineReducers({
    patterns,
    steps,
    samples,
    tracks
  })
})
