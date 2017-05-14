'use strict'
import React from 'react'
import PadRow from './PadRow'
import { connect } from 'react-redux'
import { startSequence, stopSequence } from './actions'
import DomGridPad from './DomGridPad'
import PushButton from './PushButton'

import bindKeypress from './bindKeypress'

class SequenceStartStop extends React.Component {
  constructor(props) {
    super(props)
    this.keypress = this.keypress.bind(this)
    this.togglePlay = this.togglePlay.bind(this)
  }

  keypress (event) {
    if (" " === event.key) {
      event.preventDefault()
      this.togglePlay()
    }
  }

  togglePlay () {
    const {playing, stop, start} = this.props
    playing ? stop() : start()
  }

  render () {
    const {button, playing} = this.props
    return (
      <div>
        <DomGridPad padPressed={this.togglePlay} active={playing} />
        <PushButton button={button} dim={true} on={playing} pressed={this.togglePlay} />
      </div>
    )
  }

  componentDidMount() {
    bindKeypress(this.keypress)
  }
}

export default connect(
  ({ sequencer: { playing } }) => ({ playing }),
  (dispatch) => ({
    start () {
      dispatch(startSequence())
    },
    stop () {
      dispatch(stopSequence())
    }
  })
)(SequenceStartStop)
