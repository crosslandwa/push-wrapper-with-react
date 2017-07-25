'use strict'
import React from 'react'
import Player from './index'

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
    console.log('player render')
    return null
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    const unsubscribeStartedListener = this.state.player.onStarted(this.playing)
    const unsubscribeStoppedListener = this.state.player.onStopped(this.stopped)
    this.setState({unsubscribeStartedListener, unsubscribeStoppedListener})
  }

  componentWillUnmount() {
    this.state.unsubscribeStartedListener()
    this.state.unsubscribeStoppedListener()
  }
}

export default SamplePlayer
