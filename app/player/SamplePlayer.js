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
    this.props.updateVolume(this.props.midiVolume)
    return null
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.midiVolume !== nextProps.midiVolume
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
  midiVolume: voiceForTrack(state, ownProps.trackId).midiVolume
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  register: (player) => dispatch({ type: 'REGISTER_PLAYER', trackId: ownProps.trackId, player }),
  unregister: () => dispatch({ type: 'UNREGISTER_PLAYER', trackId: ownProps.trackId }),
  updateVolume: (midiVolume) => dispatch({ type: 'PLAYER_UPDATE_VOLUME', trackId: ownProps.trackId, absoluteVolume: midiVelocityToAbsolute(midiVolume)})
})

export default connect(mapStateToProps, mapDispatchToProps)(SamplePlayer)
