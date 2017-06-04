import { selectTrack } from '../ui/actions'

const unique = (x, i, self) => self.indexOf(x) === i
function filterUnique (arr) {
  return arr.filter(unique)
}

export function createPattern (sampleIds) {
  return (dispatch, getState) => {
    const {entities: {
      patterns: {allIds: allPatternIds},
      tracks: {allIds: allTrackIds},
      voices: {allIds: allVoiceIds}
    }} = getState()
    const id = `pattern${allPatternIds.length}`
    const voiceIds = sampleIds.map((sampleId, x) => `voice${allVoiceIds.length + x}`)
    const trackIds = sampleIds.map((sampleId, x) => `track${allTrackIds.length + x}`)
    dispatch({ type: 'PATTERN_CREATE', id, sampleIds, trackIds, voiceIds })
    return id
  }
}

export function selectPattern (id) {
  return (dispatch, getState) => {
    const {entities: { patterns, tracks, steps }} = getState()
    const pattern = patterns.byId[id]

    const copiedTracks = {
      byId: Object.keys(tracks.byId).reduce((byId, trackId) => {
        byId[trackId] = tracks.byId[trackId]
        return byId
      }, {}),
      allIds: pattern.trackIds
    }

    const stepIds = copiedTracks.allIds.reduce((acc, trackId) => {
      return filterUnique(acc.concat(copiedTracks.byId[trackId].stepIds))
    }, [])

    const current = {
      patterns: {
        byId: {[pattern.id]: pattern},
        allIds: [pattern.id]
      },
      tracks: copiedTracks,
      steps: {
        byId: stepIds.reduce((byId, stepId) => {
          byId[stepId] = steps.byId[stepId]
          return byId
        }, {}),
        allIds: stepIds
      }
    }
    dispatch({ type: 'PATTERN_SELECT', id, current })
    dispatch(selectTrack(pattern.trackIds[0]))
  }
}
