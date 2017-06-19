import { combineReducers } from 'redux'
import push from '../push/reducers'
import sequencer from '../sequencer/reducers'
import ui from '../ui/reducers'
import kits from '../kits/reducers'
import patterns from '../sequencer/patternreducers'
import voices from '../voices/reducers'
import samples from '../samples/reducers'
import steps from '../sequencer/stepsreducers'
import tracks from '../sequencer/trackreducers'

export default combineReducers({
  push,
  sequencer,
  ui,
  entities: combineReducers({
    patterns,
    kits,
    steps,
    samples,
    tracks,
    voices
  })
})
