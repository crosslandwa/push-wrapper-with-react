import { createSelector } from 'reselect'

const currentTrack = state => {
  const { ui: { selectedTrackId } } = state
  return state.entities.tracks.byId[selectedTrackId]
}

const voicesSelector = state => state.entities.voices

export const samplesSelector = state => state.entities.samples

export const currentVoice = createSelector(
  currentTrack,
  voicesSelector,
  (currentTrack, voices) => {
    return voices.byId[currentTrack.voiceId]
  }
)

const tracksSelector = state => state.entities.tracks

export const trackSelector = (state, trackId) => tracksSelector(state).byId[trackId]

export const voiceForTrack = createSelector(
  trackSelector,
  voicesSelector,
  (track, voices) => voices.byId[track.voiceId]
)

export const currentSample = createSelector(
  [currentVoice, samplesSelector],
  (currentVoice, samples) => samples.byId[currentVoice.sampleId]
)
