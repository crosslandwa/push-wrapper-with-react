import { clone } from '../reducers/utils'

const initialState = {
  byId: {},
  allIds: []
}

export default function samples (state = initialState, action) {
  switch (action.type) {
    case 'SAMPLE_LOADING':
      return sampleLoading(state, action)
    case 'SAMPLE_LOADED':
      return sampleLoaded(state, action)
  }
  return state
}

function sampleLoading (state, {id, sample, url}) {
  const updated = clone(state)
  updated.byId[id] = { id, name: sample, url, loaded: false }
  if (!updated.allIds.includes(id)) {
    updated.allIds = updated.allIds.concat(id)
  }
  return updated
}

function sampleLoaded (state, {id, sample, url, loaded}) {
  const updated = clone(state)
  updated.byId[id].loaded = true
  return updated
}
