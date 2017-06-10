export default callback => {
  window.addEventListener('keydown', event => {
    if (!event.key) event.key = String.fromCharCode(event.charCode)
    callback(event)
  })
}
