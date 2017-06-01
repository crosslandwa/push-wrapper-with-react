import {createPattern, selectPattern} from './sequencer/patternActions'
import { loadSample, createVoice } from './voices/actions'

export function init () {
  return (dispatch, getState) => {
    const id = dispatch(createPattern(0))
    dispatch(selectPattern(id))
    return dispatch(loadSample(0, 'kick.mp3', 'kick'))
      .then(sampleId => dispatch(createVoice(sampleId)))
      .then(() => dispatch(loadSample(1, 'snare.mp3', 'snare')))
      .then(sampleId => dispatch(createVoice(sampleId)))
      .then(() => dispatch(loadSample(2, 'hat.mp3', 'hat')))
      .then(sampleId => dispatch(createVoice(sampleId)))
      .then(() => dispatch(loadSample(3, 'bleep.mp3', 'bleep')))
      .then(sampleId => dispatch(createVoice(sampleId)))
  }
}
