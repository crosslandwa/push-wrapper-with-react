'use strict'
import React from 'react'
import Player from './index'
import { connect } from 'react-redux'

class SamplePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playing = this.playing.bind(this)
    this.stopped = this.stopped.bind(this)
    this.state = { player: new Player() }
  }

  playing() {
    this.props.onPressed && this.props.onPressed()
  }

  stopped() {
    this.props.onReleased && this.props.onReleased()
  }

  render() {
    return null
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    console.log('mounting', this.props.trackId)
    const unsubscribeStartedListener = this.state.player.onStarted(this.playing)
    const unsubscribeStoppedListener = this.state.player.onStopped(this.stopped)
    this.props.register(this.state.player)
    this.setState({unsubscribeStartedListener, unsubscribeStoppedListener})
  }

  componentWillUnmount() {
    console.log('unmounting', this.props.trackId)
    this.state.unsubscribeStartedListener()
    this.state.unsubscribeStoppedListener()
    this.props.unregister()
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch, ownProps) => ({
  register: (player) => dispatch({ type: 'REGISTER_PLAYER', trackId: ownProps.trackId, player }),
  unregister: () => dispatch({ type: 'UNREGISTER_PLAYER', trackId: ownProps.trackId })
})

export default connect(mapStateToProps, mapDispatchToProps)(SamplePlayer)
