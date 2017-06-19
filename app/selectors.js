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

const patternForTrack = createSelector( // state, trackId
  [patternsSelector, identity(1)],
  (patterns, trackId) => patterns.allIds
    .map(id => patterns.byId[id])
    .filter(pattern => pattern.trackIds.includes(trackId))[0]
)

// ############ KIT
const kitsSelector = state => state.entities.kits

const kitSelector = (state, id) => kitSelector(state).byId[id]

export const kitIds = state => kitsSelector(state).allIds

export const currentKit = createSelector( // state
  [currentPattern, kitsSelector],
  (pattern, kits) => kits.byId[pattern.kitId]
)

// ############ TRACK
const tracksSelector = state => state.entities.tracks

export const trackIds = state => tracksSelector(state).allIds

export const currentTrack = state => trackSelector(state, state.ui.selectedTrackId)

export const trackSelector = createSelector(
  [tracksSelector, identity(1)],
  (tracks, id) => tracks.byId[id]
)

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

export const currentVoice = state => voiceForTrack(state, currentTrack(state).id)

export const voiceForTrack = createSelector( // state, trackId
  [trackSelector, patternForTrack, kitsSelector, voicesSelector, identity(1)],
  (track, pattern, kits, voices, trackId) => {
    const index = pattern.trackIds.indexOf(trackId)
    const voiceId = kits.byId[pattern.kitId].voiceIds[index]
    return voices.byId[voiceId]
  }
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

export const sampleForTrack = createSelector( // state, trackId
  [voiceForTrack, samplesSelector],
  (voice, samples) => samples.byId[voice.sampleId]
)