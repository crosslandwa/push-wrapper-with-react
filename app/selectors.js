import { createSelector } from 'reselect'

const currentTrack = state => state.entities.tracks.byId[state.ui.selectedTrackId]

const currentPatternId = state => state.sequencer.patternId

const patternsSelector = state => state.entities.patterns

const voicesSelector = state => state.entities.voices

const samplesSelector = state => state.entities.samples

const stepsSelector = state => state.entities.steps

export const sampleIds = createSelector(
  samplesSelector,
  samples => samples.allIds
)

export const currentPattern = createSelector(
  [patternsSelector, currentPatternId],
  (patterns, id) => patterns.byId[id]
)

export const currentVoice = createSelector(
  currentTrack,
  voicesSelector,
  (currentTrack, voices) => {
    return voices.byId[currentTrack.voiceId]
  }
)

const tracksSelector = state => state.entities.tracks

export const trackSelector = (state, trackId) => tracksSelector(state).byId[trackId]

export const stepSelector = (state, stepId) => stepsSelector(state).byId[stepId]

export const voiceForTrack = createSelector(
  trackSelector,
  voicesSelector,
  (track, voices) => voices.byId[track.voiceId]
)

export const currentSample = createSelector(
  [currentVoice, samplesSelector],
  (currentVoice, samples) => samples.byId[currentVoice.sampleId]
)
