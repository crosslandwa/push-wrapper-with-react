'use strict'
import React from 'react'
import DomKnob from '../push/DomKnob'

const empty = [null, null, null, null, null, null, null, null]
const padded = (components = []) => components.concat(empty).slice(0, 8)

const ChannelKnobs = (props) => {
  return (
    <div style={{display: 'table-row'}}>
      {padded(props.children).map((child, index) => (
        <div key={index} style={{display: 'table-cell', width: '12.5%'}}>
          {child || <DomKnob />}
        </div>
      ))}
    </div>
  )
}

export default ChannelKnobs
