import { createThenSelectPattern, selectPattern } from './sequencer/patternActions'
import { loadSample } from './samples/actions'
import { createDefaultKits } from './kits/actions'
import { kitIds, patternIds, sampleIds, sampleSelector } from './selectors'

export function init () {
  return (dispatch, getState) => {
    const currentPatternIds = patternIds(getState())
    const currentSampleIds = sampleIds(getState())
    const currentKitIds = kitIds(getState())
    return dispatch(currentSampleIds.length === 0
        ? loadSamples()
        : loadSamplesFromRestoredState()
      )
      .then(() => {
        return (currentKitIds.length === 0)
          ? dispatch(createDefaultKits())
          : currentKitIds
      })
      .then(kitIds => {
        return (currentPatternIds.length === 0)
          ? dispatch(createThenSelectPattern(kitIds[0]))
          : dispatch(selectPattern(currentPatternIds[0]))
      })
  }
}

function loadSamples () {
  return (dispatch, getState) => {
    console.log('Loading samples...')
    return Promise.all([
      // order here will imply initial kit sample assignment
      ['kick', 'snare', 'clap', 'cloing', 'tang', 'tom', 'hat', 'tamb']
        .forEach(name => dispatch(loadSample(`${name}.mp3`, name)))
    ])
  }
}

function loadSamplesFromRestoredState () {
  return (dispatch, getState) => {
    console.log('Restoring samples from state...')
    const currentSampleIds = sampleIds(getState())
    return Promise.all(currentSampleIds.map(sampleId => {
      const sample = sampleSelector(getState(), sampleId)
      return dispatch(loadSample(sample.url, sample.name, sample.id))
    }))
  }
}
