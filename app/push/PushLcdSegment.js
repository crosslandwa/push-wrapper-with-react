'use strict'
import React from 'react'

class PushLcdSegment extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    this.props.text
      ? this.props.lcdSegment.display(this.props.text)
      : this.props.lcdSegment.clear()
    return null
  }

  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text
  }
}

export default PushLcdSegment
