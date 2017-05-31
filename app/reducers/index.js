import { combineReducers } from 'redux'
import push from '../push/reducers'
import sequencer from '../sequencer/reducers'
import ui from '../ui/reducers'
import voices from '../voices/reducers'
import steps from '../sequencer/stepsreducers'
import patterns from '../sequencer/patternsreducers'

export default combineReducers({
  push,
  sequencer,
  ui,
  voices,
  entities: combineReducers({
    patterns,
    steps
  })
})
