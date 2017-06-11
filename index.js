'use strict'
const pushWrapper = require('push-wrapper')

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import App from './app/App'
import rootReducer from './app/reducers'
import { init } from './app/initialisationActions'

const loadPush = () => pushWrapper.webMIDIio()
  .catch(err => { console.warn(err); return { inputPort: {}, outputPort: { send: () => {} } } })
  .then(({inputPort, outputPort}) => {
    const push = pushWrapper.push()
    inputPort.onmidimessage = event => push.midiFromHardware(event.data)
    push.onMidiToHardware(outputPort.send.bind(outputPort))
    return push
  })

Promise.all([
  loadPush()
]).then(app)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function app([push]) {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunkMiddleware),
    )
  )

  push.clearLCD()

  store.dispatch(init())
    .then(() => {
      ReactDOM.render(
        <Provider store={store}>
          <App push={push} />
        </Provider>,
        document.getElementById('app')
      )
    })
}
