'use strict'
import React from 'react'
import { connect } from 'react-redux'
import KitSelectButton from './KitSelectButton'
import { kitIds } from '../selectors'

const KitSelectButtons = ({buttons, kitIds, style}) => (
  <div style={style} >
    {[...Array(8).keys()].map(index => (
      <KitSelectButton
        key={kitIds[index] || index}
        button={buttons[index]}
        kitId={kitIds[index]}
      />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  kitIds: kitIds(state)
})

export default connect(mapStateToProps)(KitSelectButtons)
