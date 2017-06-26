const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const PlayerFactory = require('wac.sample-player')(context)
const Scheduling = require('wac.scheduling')(context)

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity })
const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)
const middleCFreq = midiNoteToF(36)
const playbackRate = note => midiNoteToF(note) / middleCFreq

const secondsFromMs = ms => context.currentTime + (ms / 1000)

class Player {
  constructor () {
    const emptyBuffer = context.createBuffer(1, context.sampleRate / 1000, context.sampleRate)
    const self = this
    this.envelope = context.createGain()
    this.envelope.connect(context.destination) // TODO attach to mixer
    this.envelope.gain.setValueAtTime(1, context.currentTime)
    PlayerFactory.withBuffer(emptyBuffer)
      .then(player => {
        self.player = player
        self.player.connect(self.envelope)
      })
    this.play = this.play.bind(this)
    this.changeSample = this.changeSample.bind(this)
    this.onStarted = this.onStarted.bind(this)
    this.onStopped = this.onStopped.bind(this)
  }

  play (pitch, velocity, decayPercent = 100) {
    const lengthMs = 200 * (decayPercent / 100) // TODO this would need to be percentage of sample length
    this.envelope.gain.setValueAtTime(1, context.currentTime)
    this.envelope.gain.linearRampToValueAtTime(0, secondsFromMs(lengthMs))
    Scheduling.atATime(
      () => { this.player.emit('stopped') }, // TODO YUK, there is no 'stop' method on wac.sample-player...
      Scheduling.nowMs() + lengthMs)
    return this.player
      .updatePlaybackRate(playbackRate(pitch))
      .play(midiGain(velocity))
  }

  changeSample (buffer) {
    return this.player.setBuffer(buffer)
  }

  onStarted (callback) {
    const wrapped = gain => callback(gain.velocity)
    this.player.on('started', wrapped)
    return () => this.player.removeListener('started', wrapped)
  }

  onStopped (callback) {
    this.player.on('stopped', callback)
    return () => this.player.removeListener('stopped', callback)
  }
}

export default Player
