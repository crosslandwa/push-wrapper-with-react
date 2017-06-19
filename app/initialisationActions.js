import { createPattern, selectPattern } from './sequencer/patternActions'
import { selectTrack } from './ui/actions'
import { initialisePlayers } from './voices/actions'
import { loadSample } from './samples/actions'
import { createKit } from './kits/actions'
import { kitIds, patternIds, sampleIds, sampleSelector } from './selectors'

export function init () {
  return (dispatch, getState) => {
    const currentPatternIds = patternIds(getState())
    const currentSampleIds = sampleIds(getState())
    const currentKitIds = kitIds(getState())
    return Promise.resolve(dispatch(initialisePlayers()))
      .then(() => {
        return currentSampleIds.length === 0
          ? Promise.all([
              dispatch(loadSample('kick.mp3', 'kick')),
              dispatch(loadSample('snare.mp3', 'snare')),
              dispatch(loadSample('hat.mp3', 'hat')),
              dispatch(loadSample('bleep.mp3', 'bleep'))
            ])
          : Promise.all(currentSampleIds.map(sampleId => {
              const sample = sampleSelector(getState(), sampleId)
              return dispatch(loadSample(sample.url, sample.name, sample.id))
          }))
      })
      .then(() => {
        return (currentKitIds.length == 0)
          ? dispatch(createKit([])) // TODO pass voice IDs
          : currentKitIds[0]
      })
      .then(kitId => {
        const patternId = (currentPatternIds.length == 0)
          ? dispatch(createPattern(kitId))
          : currentPatternIds[0]
        dispatch(selectPattern(patternId))
      })
  }
}
