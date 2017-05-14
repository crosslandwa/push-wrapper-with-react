'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { startSequence, stopSequence } from './sequencer/actions'
import DomGridPad from './DomGridPad'
import PushButton from './PushButton'

import bindKeypress from './bindKeypress'

class SequencerRecOverdub extends React.Component {
  constructor(props) {
    super(props)
    this.keypress = this.keypress.bind(this)
    this.togglePlay = this.togglePlay.bind(this)
  }

  keypress (event) {
    if ("r" === event.key) {
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
        <DomGridPad padPressed={this.togglePlay} active={playing} rgb={[200, 10, 0]} />
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
)(SequencerRecOverdub)
