export default callback => {
  window.addEventListener('keypress', event => {
    if (!event.key) event.key = String.fromCharCode(event.charCode)
    callback(event)
  })
}
