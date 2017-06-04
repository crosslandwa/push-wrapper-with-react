import { createPattern, selectPattern } from './sequencer/patternActions'
import { selectTrack } from './ui/actions'
import { loadSample } from './voices/actions'
// import { loadSample } from './samples/actions'

export function init () {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(loadSample('kick.mp3', 'kick')),
      dispatch(loadSample('snare.mp3', 'snare')),
      dispatch(loadSample('hat.mp3', 'hat')),
      dispatch(loadSample('bleep.mp3', 'bleep'))
    ]).then(sampleIds => {
      const patternId = dispatch(createPattern(sampleIds))
      dispatch(selectPattern(patternId))
    })
  }
}
