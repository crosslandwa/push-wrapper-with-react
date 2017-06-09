'use strict'
import React from 'react'
import DomKnob from './DomKnob'

const noop = () => {}

class ClickyDraggy extends React.Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
    this.release = this.release.bind(this)
    this.drag = this.drag.bind(this)
    this.state = { selected: false, moveListener: noop }
  }

  click (e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({selected: true, lastDragPosition: e.pageY})
  }

  release (e) {
    if (!this.state.selected) return
    this.setState({selected: false})
  }

  drag (e) {
    // reverse substitution order to give +ve delta as drag up the page
    const delta = parseInt((this.state.lastDragPosition - e.pageY) / 2)
    if (delta === 0 || !this.props.onTurned) return

    this.props.onTurned(delta)
    this.setState({lastDragPosition: e.pageY})
  }

  render () {
    const {onPressed, onReleased, onTurned} = this.props
    // TODO div is currently full width of page, so I can click/drag it anywhere!
    return (
      <div
        onMouseDown={this.click}
        onMouseUp={this.release}
        onMouseLeave={this.release} // TODO this is wrong if we are currently dragging...
        onMouseMove={this.state.selected && this.drag}
      >
        {this.props.children}
      </div>
    )
  }
}

export default ClickyDraggy
