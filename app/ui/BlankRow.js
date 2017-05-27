'use strict'
import React from 'react'
import DomGridPad from '../push/DomGridPad'

const BlankRow = () => (
  <div>
    {[...Array(8).keys()].map(index => (
      <DomGridPad key={index} />
    ))}
  </div>
)

export default BlankRow
