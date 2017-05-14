'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { startSequence, stopSequence, armSequencer, disarmSequencer } from './sequencer/actions'
import DomGridPad from './DomGridPad'
import PushButton from './PushButton'

import bindKeypress from './bindKeypress'

class TransportControls extends React.Component {
  constructor(props) {
    super(props)
    this.keypress = this.keypress.bind(this)
    this.togglePlay = this.togglePlay.bind(this)
    this.toggleArmed = this.toggleArmed.bind(this)
  }

  keypress (event) {
    switch(event.key) {
      case " ":
        event.preventDefault()
        this.togglePlay()
        break;
      case "r":
        this.toggleArmed();
        break;
    }
  }

  togglePlay () {
    const {playing, stop, start} = this.props
    playing ? stop() : start()
  }

  toggleArmed () {
    const {recording, arm, disarm} = this.props
    recording ? disarm() : arm()
  }

  render () {
    const {playing, recording, push} = this.props
    return (
      <div>
        <DomGridPad padPressed={this.togglePlay} active={playing} rgb={[0, 200, 10]} />
        <PushButton button={push.button('Play')} dim={true} on={playing} pressed={this.togglePlay} />
        <DomGridPad padPressed={this.toggleArmed} active={recording} rgb={[200, 10, 0]} />
        <PushButton button={push.button('Rec')} dim={true} on={recording} pressed={this.toggleArmed} />
      </div>
    )
  }

  componentDidMount() {
    bindKeypress(this.keypress)
  }
}

export default connect(
  ({ sequencer: { playing, recording } }) => ({ playing, recording }),
  (dispatch) => ({
    start () {
      dispatch(startSequence())
    },
    stop () {
      dispatch(stopSequence())
    },
    arm () {
      dispatch(armSequencer())
    },
    disarm () {
      dispatch(disarmSequencer())
    }
  })
)(TransportControls)
