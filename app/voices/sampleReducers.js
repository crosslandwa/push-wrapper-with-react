import { clone } from '../reducers/utils'

const initialState = {
  byId: {},
  allIds: []
}

export default function samples (state = initialState, action) {
  switch (action.type) {
    case 'SAMPLE_LOADED':
      return sampleLoaded(state, action)
  }
  return state
}

function sampleLoaded (state, {id, sample, url}) {
  const updated = clone(state)
  updated.byId[id] = { id, name: sample, url }
  updated.allIds = updated.allIds.concat(id)
  return updated
}
