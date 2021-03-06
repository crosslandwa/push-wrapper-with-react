const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton

const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)
const middleCFreq = midiNoteToF(36)
const playbackRate = note => midiNoteToF(note) / middleCFreq

class Player {
  constructor () {
    const self = this
    this.volume = context.createGain()
    this.volume.gain.setValueAtTime(1, context.currentTime)
    this.filter = context.createBiquadFilter(),
    this.filter.connect(this.volume)
    this.volume.connect(context.destination) // TODO attach to mixer
    this.stoppedListeners = []
    this.startedListeners = []
  }

  updateVolume (absolute) {
    this.volume.gain.setValueAtTime(absolute, context.currentTime)
  }

  play ({buffer, pitch, velocity, decayPercent = 100, filterFrequency = 20000, stepTimeMs}) {
    // this sounds loads better than using wac.sample-player (with an envelope applied over the top). What about re-triggers?
    const source = context.createBufferSource()
    const envelope = context.createGain()
    const rate = playbackRate(pitch)
    const playbackLength = (buffer.duration * Math.pow(decayPercent / 100, 2.5)) / rate
    source.buffer = buffer
    source.playbackRate.value = rate
    source.connect(envelope)
    envelope.connect(this.filter)
    source.addEventListener('ended', () => {
      envelope.disconnect()
      this.stoppedListeners.forEach(listener => listener())
    })
    this.startedListeners.forEach(listener => listener(velocity))
    const stepTimeSeconds = stepTimeMs ? (stepTimeMs / 1000) : context.currentTime
    this.filter.frequency.setValueAtTime(filterFrequency, stepTimeSeconds)
    envelope.gain.setValueAtTime(velocity / 127, stepTimeSeconds)
    envelope.gain.linearRampToValueAtTime((velocity / 127) * 0.8, stepTimeSeconds + (playbackLength * 0.8))
    envelope.gain.linearRampToValueAtTime(0, stepTimeSeconds + playbackLength)
    source.start(stepTimeSeconds)
    source.stop(stepTimeSeconds + (playbackLength * 1.2))
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
