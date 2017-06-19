import { combineReducers } from 'redux'
import push from '../push/reducers'
import sequencer from '../sequencer/reducers'
import ui from '../ui/reducers'
import voices from '../voices/reducers'
import samples from '../samples/reducers'
import steps from '../sequencer/stepsreducers'
import patterns from '../sequencer/patternreducers'
import tracks from '../sequencer/trackreducers'

export default combineReducers({
  push,
  sequencer,
  ui,
  entities: combineReducers({
    patterns,
    steps,
    samples,
    tracks,
    voices
  })
})
