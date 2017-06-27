const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity })
const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)
const middleCFreq = midiNoteToF(36)
const playbackRate = note => midiNoteToF(note) / middleCFreq

class Player {
  constructor () {
    const emptyBuffer = context.createBuffer(1, context.sampleRate / 1000, context.sampleRate)
    this.buffer = emptyBuffer
    const self = this
    this.envelope = context.createGain()
    this.envelope.connect(context.destination) // TODO attach to mixer
    this.envelope.gain.setValueAtTime(1, context.currentTime)
    this.stoppedListeners = []
    this.startedListeners = []
  }

  play (pitch, velocity, decayPercent = 100) {
    // this sounds loads better than using wac.sample-player (with an envelope applied over the top). What about re-triggers?
    const source = context.createBufferSource()
    const playbackLength = (this.buffer.duration * (decayPercent / 100)) / playbackRate(pitch)
    source.buffer = this.buffer
    source.playbackRate.value = playbackRate(pitch)
    source.connect(this.envelope)
    source.addEventListener('ended', () => this.stoppedListeners.forEach(listener => listener()))
    this.startedListeners.forEach(listener => listener(velocity))
    const now = context.currentTime
    source.start(now)
    source.stop(now + (playbackLength * 2))
    this.envelope.gain.setValueAtTime(1, now)
    this.envelope.gain.linearRampToValueAtTime(0.8, now + (playbackLength * 0.8))
    this.envelope.gain.linearRampToValueAtTime(0, now + playbackLength)
  }

  changeSample (buffer) {
    this.buffer = buffer
    return this
  }

  onStarted (listener) {
    if (this.startedListeners.indexOf(listener) === -1) this.startedListeners.push(listener)
    return () => { this.startedListeners = this.startedListeners.filter(cb => cb !== listener) }
  }

  onStopped (listener) {
    if (this.stoppedListeners.indexOf(listener) === -1) this.stoppedListeners.push(listener)
    return () => { this.stoppedListeners = this.stoppedListeners.filter(cb => cb !== listener) }
  }
}

export default Player