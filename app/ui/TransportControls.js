'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { startSequence, stopSequence, armSequencer, disarmSequencer } from '../sequencer/actions'
import DomButton from '../push/DomButton'
import { Colours } from '../push/colours'
import PushButton from '../push/PushButton'
import PushKnob from '../push/PushKnob'
import ClickyDraggy from '../push/ClickyDraggy'
import DomKnob from '../push/DomKnob'
import BpmControlKnob from '../sequencer/BpmControlKnob'

import bindKeypress from '../utils/bindKeypress'

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
        <BpmControlKnob>
          <PushKnob knob={push.tempoKnob()} />
          <ClickyDraggy><DomKnob /></ClickyDraggy>
        </BpmControlKnob>
        <DomButton label='Rec' padPressed={this.toggleArmed} active={recording} rgb={Colours.red} />
        <PushButton button={push.button('Rec')} dim={true} on={recording} onPressed={this.toggleArmed} />
        <DomButton label='Play' padPressed={this.togglePlay} active={playing} rgb={Colours.green} />
        <PushButton button={push.button('Play')} dim={true} on={playing} onPressed={this.togglePlay} />
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
