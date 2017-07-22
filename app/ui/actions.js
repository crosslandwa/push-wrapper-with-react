export function selectTrack (trackId) {
  return { type: 'UI_SELECT_TRACK', trackId }
}

export function startSampleSelection () {
  return { type: 'UI_SAMPLE_SELECT_START' }
}

export function stopSampleSelection () {
  return { type: 'UI_SAMPLE_SELECT_STOP' }
}
