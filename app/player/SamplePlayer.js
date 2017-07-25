'use strict'
import React from 'react'
import Player from './index'
import { connect } from 'react-redux'
import midiVelocityToAbsolute from '../voices/midiVelocityToAbsolute'
import { voiceForTrack } from '../selectors'

class SamplePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playing = this.playing.bind(this)
    this.stopped = this.stopped.bind(this)
    this.state = { player: new Player() }
  }

  playing() {
    // TODO dispatch playing action
    this.props.onPressed && this.props.onPressed()
  }

  stopped() {
    // TODO dispatch playing action
    this.props.onReleased && this.props.onReleased()
  }

  render() {
    this.state.player.updateVolume(this.props.absoluteVolume)
    return null
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.absoluteVolume !== nextProps.absoluteVolume
  }

  componentWillMount() {
    const unsubscribeStartedListener = this.state.player.onStarted(this.playing)
    const unsubscribeStoppedListener = this.state.player.onStopped(this.stopped)
    this.props.register(this.state.player)
    this.setState({unsubscribeStartedListener, unsubscribeStoppedListener})
  }

  componentWillUnmount() {
    this.state.unsubscribeStartedListener()
    this.state.unsubscribeStoppedListener()
    this.props.unregister()
  }
}

const mapStateToProps = (state, ownProps) => ({
  absoluteVolume: midiVelocityToAbsolute(voiceForTrack(state, ownProps.trackId).midiVolume)
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  register: (player) => dispatch({ type: 'REGISTER_PLAYER', trackId: ownProps.trackId, player }),
  unregister: () => dispatch({ type: 'UNREGISTER_PLAYER', trackId: ownProps.trackId })
})

export default connect(mapStateToProps, mapDispatchToProps)(SamplePlayer)
