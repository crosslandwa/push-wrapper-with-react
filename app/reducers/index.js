import { combineReducers } from 'redux'
import voices from '../voices/reducers'
import sequencer from '../sequencer/reducers'
import push from '../push/reducers'

export default combineReducers({
  push,
  sequencer,
  voices
})
