import { createSelector } from 'reselect'

const identity = index => (...args) => args[index]

export const currentBpm = state => state.sequencer.bpm
export const currentSwing = state => state.sequencer.swing
export const isRecording = state => state.sequencer.recording

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

export const kitIds = state => kitsSelector(state).allIds

export const currentKit = createSelector( // state
  [currentPattern, kitsSelector],
  (pattern, kits) => kits.byId[pattern.kitId]
)

// ############ TRACK
const tracksSelector = state => state.entities.tracks

export const trackIds = state => tracksSelector(state).allIds

export const currentTrack = state => trackSelector(state, state.ui.selectedTrackId)

export const currentTracksForPattern = state => currentPattern(state).trackIds
  .map(trackId => trackSelector(state, trackId))

export const trackSelector = createSelector(
  [tracksSelector, identity(1)],
  (tracks, id) => tracks.byId[id]
)

export const selectedTrackIndex = createSelector(
  [currentPattern, currentTrack],
  (pattern, track) => pattern ? pattern.trackIds.indexOf(track.id) : -1
)

const trackIndex = createSelector( //state, trackId
  [currentPattern, identity(1)],
  (pattern, trackId) => pattern ? pattern.trackIds.indexOf(trackId) : -1
)

// ############ STEPS
const stepsSelector = state => state.entities.steps

const selectedStepIdsSelector = state => state.sequencer.selectedStepIds

export const stepIds = state => stepsSelector(state).allIds

export const stepSelector = createSelector(
  [stepsSelector, identity(1)],
  (steps, stepId) => steps.byId[stepId]
)

export const currentStepNumberForTrack = (state, trackId) => {
  const index = trackIndex(state, trackId)
  return state.sequencer.currentSteps[index]
}

export const nextStepNumberForTrack = (state, trackId) => {
  const index = trackIndex(state, trackId)
  return state.sequencer.nextSteps[index]
}

export const selectedSteps = createSelector( // state
  [selectedStepIdsSelector, identity(0)],
  (stepIds, state) => stepIds.map(id => stepSelector(state, id))
)

export const mostRecentlySelectedStep = createSelector( // state
  [selectedSteps],
  (steps) => steps.slice(-1)[0] || {}
)

// ############ VOICE
const voicesSelector = state => state.entities.voices
const voiceSelector = (state, id) => voicesSelector(state).byId[id]

export const voiceIds = state => voicesSelector(state).allIds

export const currentVoice = state => voiceForTrack(state, currentTrack(state).id)

export const voiceForTrack = createSelector( // state, trackId
  [patternForTrack, kitsSelector, voicesSelector, identity(1)],
  (pattern, kits, voices, trackId) => {
    const index = pattern.trackIds.indexOf(trackId)
    const voiceId = kits.byId[pattern.kitId].voiceIds[index]
    return voices.byId[voiceId]
  }
)

export const voicesForCurrentKit = createSelector( // state
  [currentKit, identity(0)],
  (kit, state) => kit.voiceIds.map(id => voiceSelector(state, id))
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

export const sampleSelectionOn = (state) => state.ui.sampleSelectionOn

// ############ modifiers

export const modifiersDuplicateSelector = state => state.push.modifiers.duplicate
export const modifiersDeleteSelector = state => state.push.modifiers.delete
