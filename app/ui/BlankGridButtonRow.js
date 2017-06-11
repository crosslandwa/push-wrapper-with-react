'use strict'
import React from 'react'
import DomGridButton from '../push/DomGridButton'

const BlankGridButtonRow = () => (
  <div>
    {[...Array(8).keys()].map(index => (
      <DomGridButton key={index} />
    ))}
  </div>
)

export default BlankGridButtonRow
