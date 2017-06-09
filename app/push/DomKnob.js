'use strict'
import React from 'react'
import { Colours } from './colours'

const style = {
  display: 'inline-block',
  height: 48,
  width: 48,
  marginLeft: 2,
  marginRight: 2,
  backgroundColor: '#c7ccce', // 199, 204, 206
  borderRadius: 50,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#333333',
  cursor: 'pointer'
}

const DomKnob = () => <div style={style}/>

export default DomKnob
