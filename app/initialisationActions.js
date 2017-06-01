import { createPattern, selectPattern } from './sequencer/patternActions'
import { loadSample, createVoice } from './voices/actions'
import { selectVoice } from './ui/actions'

export function init () {
  return (dispatch, getState) => {
    const patternId = dispatch(createPattern())
    dispatch(selectPattern(patternId))

    return Promise.all([
      dispatch(loadSample('kick.mp3', 'kick')),
      dispatch(loadSample('snare.mp3', 'snare')),
      dispatch(loadSample('hat.mp3', 'hat')),
      dispatch(loadSample('bleep.mp3', 'bleep'))
    ]).then(([firstSampleId, ...rest]) => {
      const voiceId = dispatch(createVoice(firstSampleId))
      dispatch(selectVoice(voiceId))
      rest.forEach(sampleId => dispatch(createVoice(sampleId)))
    })
  }
}
