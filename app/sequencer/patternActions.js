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
