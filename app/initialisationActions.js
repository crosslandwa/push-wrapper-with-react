import { createPattern, selectPattern } from './sequencer/patternActions'
import { loadSample, createVoice } from './voices/actions'
import { selectVoice } from './ui/actions'

export function init () {
  return (dispatch, getState) => {
    const patternId = dispatch(createPattern())
    dispatch(selectPattern(patternId))
    return dispatch(loadSample('kick.mp3', 'kick'))
      .then(sampleId => dispatch(createVoice(sampleId)))
      .then(voiceId => dispatch(selectVoice(voiceId)))
      .then(() => dispatch(loadSample('snare.mp3', 'snare')))
      .then(sampleId => dispatch(createVoice(sampleId)))
      .then(() => dispatch(loadSample('hat.mp3', 'hat')))
      .then(sampleId => dispatch(createVoice(sampleId)))
      .then(() => dispatch(loadSample('bleep.mp3', 'bleep')))
      .then(sampleId => dispatch(createVoice(sampleId)))
  }
}
