import { sampleIds } from '../selectors'

// TODO probably pass this is in, created as singleton in App...
const audioContext = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext()
const buffers = {}

const emptyBuffer = audioContext.createBuffer(1, audioContext.sampleRate / 1000, audioContext.sampleRate)

export function sampleBuffer (sampleId) {
  return buffers[sampleId]
}

function loadFromUrl (url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    request.onload = () => {
      if (request.status == 200) {
        audioContext.decodeAudioData(request.response, resolve)
      } else {
        reject(new Error(`${request.status} loading sample: "${url}"`))
      }
    }
    request.send()
  })
}

export function loadSample (url, name, sampleId) {
  return (dispatch, getState) => {
    const allIds = sampleIds(getState())
    const id = sampleId || `sample${allIds.length}`
    dispatch({ type: 'SAMPLE_LOADING', id, url, sample: name })
    return loadFromUrl(url)
      .then(buffer => {
        buffers[id] = buffer
      })
      .then(() => dispatch({ type: 'SAMPLE_LOADED', id }))
      .then(
        () => id,
        e => { console.error(e); return id }
      )
  }
}
