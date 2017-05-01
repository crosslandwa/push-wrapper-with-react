'use strict'
import React from 'react'
import { connect } from 'react-redux'

const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const PlayerFactory = require('wac.sample-player')(context)
const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

class SamplePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playing = this.playing.bind(this)
    this.stopped = this.stopped.bind(this)
    this.playWithVelocity = this.playWithVelocity.bind(this)
    this.state = { velocity: 0 }
  }

  playWithVelocity(velocity) {
    if (this.state.player) this.state.player.play(midiGain(velocity))
  }

  playing(gain) {
    this.props.playing(gain.velocity())
  }

  stopped() {
    this.props.playing(0)
  }

  render() {
    return null
  }

  componentDidMount() {
    const loading = this.props.loading || (() => {})
    loading(true);
    if (!this.state.player) {
      PlayerFactory.forResource(this.props.url).then(player => {
        loading(false)
        player.toMaster()
        player.on('started', this.playing)
        player.on('stopped', this.stopped)
        this.setState({ player })
      })
    }
  }

  componentWillUnmount() {
    if (this.state.player) {
      this.state.player.removeListener('started', this.playing)
      this.state.player.removeListener('stopped', this.stopped)
    }
  }
}

export default connect(
  ({ sampleUrls }, { sample }) => ({ url: sampleUrls[sample] }),
  dispatch => ({}),
  (ownProps, stateProps, dispatchProps) => Object.assign({}, ownProps, stateProps, dispatchProps),
  { withRef: true }
)(SamplePlayer)
