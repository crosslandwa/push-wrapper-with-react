'use strict'
import React from 'react'
import Player from './index'
import { connect } from 'react-redux'
import midiVelocityToAbsolute from '../voices/midiVelocityToAbsolute'
import { voiceForTrack } from '../selectors'
import { voicePlaying } from '../voices/actions'

class SamplePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playing = this.playing.bind(this)
    this.stopped = this.stopped.bind(this)
    this.state = { player: new Player() }
  }

  playing(velocity) {
    this.props.playing(velocity)
  }

  stopped() {
    this.props.stopped()
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
  unregister: () => dispatch({ type: 'UNREGISTER_PLAYER', trackId: ownProps.trackId }),
  playing: (velocity) => dispatch(voicePlaying(ownProps.trackId, velocity)),
  stopped: () => dispatch(voicePlaying(ownProps.trackId, 0))
})

export default connect(mapStateToProps, mapDispatchToProps)(SamplePlayer)
