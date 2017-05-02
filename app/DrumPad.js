'use strict'
import React from 'react'
import PushGridPad from './PushGridPad'
import DomGridPad from './DomGridPad'
import SamplePlayer from './SamplePlayer'

class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.isPlaying = this.isPlaying.bind(this)
    this.state = { velocity: 0 }
  }

  isPlaying (velocity) {
    this.setState({ velocity })
  }

  render() {
    const {velocity} = this.state
    const {pad, sample} = this.props
    return (
      <div style={{display: 'inline-block'}} className='drumpad'>
        <SamplePlayer
          ref={player => { this._player = player && player.getWrappedInstance() }}
          playing={this.isPlaying}
          sample={sample}
        />
        <PushGridPad
          velocity={velocity}
          pad={pad}
          padPressed={velocity => { this._player && this._player.playWithVelocity(velocity) }}
          rgb={[250, 250, 0]}
        />
        <DomGridPad
          padPressed={() => { this._player && this._player.playWithVelocity(100) }}
          active={velocity > 0}
          className="pad"
        />
      </div>
    )
  }

}

export default DrumPad
