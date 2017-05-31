const clone = x => JSON.parse(JSON.stringify(x))
const emptySequence = (id, length = 32) => ({
  id,
  steps: [...Arrays(length).keys()].map(x => 'emptyStep')
})

const intialState = { byId: {}, allIds: [] }

export default function patterns (state = intialState, action) {
  switch (action.type) {
    case 'xxx':
      return state
  }
  return state
}
