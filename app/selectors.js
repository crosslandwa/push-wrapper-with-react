import { createSelector } from 'reselect'

const identity = index => (...args) => args[index]

// ############ PATTERN
const currentPatternId = state => state.sequencer.patternId
const patternsSelector = state => state.entities.patterns

export const patternIds = state => patternsSelector(state).allIds

export const patternSelector = (state, id) => patternsSelector(state).byId[id]

export const currentPattern = createSelector(
  [patternsSelector, currentPatternId],
  (patterns, id) => patterns.byId[id]
)

// ############ TRACK
const tracksSelector = state => state.entities.tracks

export const trackIds = state => tracksSelector(state).allIds

export const currentTrack = state => tracksSelector(state).byId[state.ui.selectedTrackId]

export const trackSelector = (state, trackId) => tracksSelector(state).byId[trackId]

// ############ STEPS
const stepsSelector = state => state.entities.steps

export const stepIds = state => stepsSelector(state).allIds

export const stepSelector = createSelector(
  [stepsSelector, identity(1)],
  (steps, stepId) => steps.byId[stepId]
)

// ############ VOICE
const voicesSelector = state => state.entities.voices

export const voiceIds = state => voicesSelector(state).allIds

export const currentVoice = createSelector(
  currentTrack,
  voicesSelector,
  (currentTrack, voices) => {
    return voices.byId[currentTrack.voiceId]
  }
)

export const voiceForTrack = createSelector(
  trackSelector,
  voicesSelector,
  (track, voices) => voices.byId[track.voiceId]
)

// ############ SAMPLE
const samplesSelector = state => state.entities.samples

export const sampleIds = createSelector(
  samplesSelector,
  samples => samples.allIds
)

export const sampleSelector = (state, sampleId) => samplesSelector(state).byId[sampleId]

export const currentSample = createSelector(
  [currentVoice, samplesSelector],
  (currentVoice, samples) => samples.byId[currentVoice.sampleId]
)

export const sampleForTrack = createSelector(
  [voiceForTrack, samplesSelector],
  (voice, samples) => samples.byId[voice.sampleId]
)
