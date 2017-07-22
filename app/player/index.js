const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton

const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)
const middleCFreq = midiNoteToF(36)
const playbackRate = note => midiNoteToF(note) / middleCFreq

class Player {
  constructor () {
    const self = this
    this.volume = context.createGain()
    this.volume.connect(context.destination) // TODO attach to mixer
    this.volume.gain.setValueAtTime(1, context.currentTime)
    this.stoppedListeners = []
    this.startedListeners = []
  }

  play (buffer, pitch, velocity, decayPercent = 100) {
    // this sounds loads better than using wac.sample-player (with an envelope applied over the top). What about re-triggers?
    const source = context.createBufferSource()
    const envelope = context.createGain()
    const rate = playbackRate(pitch)
    const playbackLength = (buffer.duration * (decayPercent / 100)) / rate
    source.buffer = buffer
    source.playbackRate.value = rate
    source.connect(envelope)
    envelope.connect(this.volume)
    source.addEventListener('ended', () => this.stoppedListeners.forEach(listener => listener()))
    this.startedListeners.forEach(listener => listener(velocity))
    const now = context.currentTime
    envelope.gain.setValueAtTime(velocity / 127, now)
    envelope.gain.linearRampToValueAtTime((velocity / 127) * 0.8, now + (playbackLength * 0.8))
    envelope.gain.linearRampToValueAtTime(0, now + playbackLength)
    source.start(now)
    source.stop(now + (playbackLength * 1.2))
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
