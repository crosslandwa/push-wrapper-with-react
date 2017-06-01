const unique = (x, i, self) => self.indexOf(x) === i
function filterUnique (arr) {
  return arr.filter(unique)
}

export function createPattern (patternNumber) {
  return (dispatch, getState) => {
    const {entities: {
      patterns: {allIds: allPatternIds},
      tracks: {allIds: allTrackIds},
    }} = getState()
    const id = `pattern${allPatternIds.length}`
    const trackIds = [...Array(8).keys()].map(x => `track${allTrackIds.length + x}`)
    dispatch({ type: 'PATTERN_CREATE', id, trackIds, patternNumber })
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
      pattern,
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
  }
}
