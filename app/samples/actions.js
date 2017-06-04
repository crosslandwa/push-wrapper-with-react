// TODO probably pass this is in, created as singleton in App...
const audioContext = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext()

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

const buffers = {} // TODO how to access this from players in voice actions?

export function loadSample (url, name) {
  return (dispatch, getState) => {
    const {entities: {samples: {allIds}}} = getState()
    const id = `sample${allIds.length}`
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
