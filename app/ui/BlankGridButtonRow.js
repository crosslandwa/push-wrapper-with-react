'use strict'
import React from 'react'
import DomGridButton from '../push/DomGridButton'

const BlankGridButtonRow = () => (
  <div style={{display: 'table-row'}}>
    {[...Array(8).keys()].map(index => (
      <div key={index} style={{display: 'table-cell'}}>
        <DomGridButton key={index} />
      </div>
    ))}
  </div>
)

export default BlankGridButtonRow
