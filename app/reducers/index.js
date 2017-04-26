import { combineReducers } from 'redux'

function toggles (state = Array(8).fill(false), action) {
  switch (action.type) {
    case 'TOGGLE':
      const toggles = state.slice()
      toggles[action.index] = !toggles[action.index]
      return toggles
  }
  return state
}

export default combineReducers({
  toggles
})
