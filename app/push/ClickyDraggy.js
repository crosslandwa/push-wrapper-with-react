'use strict'
import React from 'react'

class ClickyDraggy extends React.Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
    this.release = this.release.bind(this)
    this.drag = this.drag.bind(this)
    this.state = { selected: false }
  }

  click (e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({selected: true, lastDragPosition: e.pageY})
    this.props.onPressed && this.props.onPressed()
  }

  release (e) {
    if (!this.state.selected) return
    this.setState({selected: false})
    this.props.onReleased && this.props.onReleased()
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
    return (
      <div
        onMouseDown={this.click}
        onMouseUp={this.release}
        onMouseLeave={this.release}
        onMouseMove={this.state.selected && this.drag}
      >
        {this.props.children}
      </div>
    )
  }
}

export default ClickyDraggy
