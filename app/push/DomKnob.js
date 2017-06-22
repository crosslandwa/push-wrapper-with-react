'use strict'
import React from 'react'
import { Colours } from './colours'

const style = {
  height: 48,
  width: 48,
  backgroundColor: '#333333', // 199, 204, 206
  borderRadius: 50,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#111111',
  boxShadow: 'inset 0px 0px 8px rgba(200, 200, 200, 1)',
  cursor: 'pointer'
}

const DomKnob = () => <div style={style}/>

export default DomKnob
