import { createPattern, selectPattern } from './sequencer/patternActions'
import { loadSample, createVoice } from './voices/actions'
import { selectTrack } from './ui/actions'

export function init () {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(loadSample('kick.mp3', 'kick')),
      dispatch(loadSample('snare.mp3', 'snare')),
      dispatch(loadSample('hat.mp3', 'hat')),
      dispatch(loadSample('bleep.mp3', 'bleep'))
    ]).then(sampleIds => {
      return sampleIds.map(sampleId => dispatch(createVoice(sampleId)))
    }).then(voiceIds => {
      const patternId = dispatch(createPattern(voiceIds))
      dispatch(selectPattern(patternId))
    })
  }
}
