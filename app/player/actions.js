import { sampleBuffer } from '../samples/actions'
import NonLinearScale from '../utils/nonLinearScale'
import { voiceForTrack } from '../selectors'

export const frequencyScaling = NonLinearScale(0, 127, 80, 20000, 1000)

export function playVoiceForTrack (trackId, {decay, pitch, velocity, stepTimeMs}) {
  return (dispatch, getState) => {
    const voice = voiceForTrack(getState(), trackId)
    dispatch({
      type: 'PLAYER_PLAY',
      trackId,
      playbackData: {
        buffer: sampleBuffer(voice.sampleId),
        pitch: pitch || voice.pitch,
        velocity,
        decayPercent: decay || voice.decay,
        filterFrequency: frequencyScaling(voice.filterAmount),
        stepTimeMs
      }
    })
  }
}
