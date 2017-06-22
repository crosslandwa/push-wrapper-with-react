'use strict'
import React from 'react'
import DomKnob from '../push/DomKnob'

const empty = [null, null, null, null, null, null, null, null]
const padded = (components = []) => components.concat(empty).slice(0, 8)

const style = {
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: 4
}

const ChannelKnobs = (props) => {
  return (
    <div style={style}>
      {padded(props.children).map((child, index) => child || <DomKnob key={index} />)}
    </div>
  )
}

export default ChannelKnobs
