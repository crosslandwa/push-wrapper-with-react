'use strict'
const pushWrapper = require('push-wrapper')

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import App from './app/App'

const loadPush = () => pushWrapper.webMIDIio()
  .catch(err => { console.error(err); return { inputPort: {}, outputPort: { send: () => {} } } })
  .then(({inputPort, outputPort}) => {
    const push = pushWrapper.push()
    inputPort.onmidimessage = event => push.midiFromHardware(event.data)
    push.onMidiToHardware(outputPort.send.bind(outputPort))
    return push
  })

Promise.all([
  loadPush()
]).then(app)

function app([push]) {
  const store = createStore(
    combineReducers({ toggles }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  ReactDOM.render(
    <Provider store={store}>
      <App push={push} />
    </Provider>,
    document.getElementById('app')
  )
}

function toggles (state = Array(8).fill(false), action) {
  switch (action.type) {
    case 'TOGGLE':
      const toggles = state.slice()
      toggles[action.index] = !toggles[action.index]
      return toggles
  }
  return state
}
