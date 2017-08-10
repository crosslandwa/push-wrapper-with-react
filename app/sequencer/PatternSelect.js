'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { patternButtonPressed } from './patternActions'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { Colours } from '../push/colours'
import { currentPattern } from '../selectors'

const PatternSelect = props => {
  const {pad, patternId, selectPattern, selected} = props
  const rgb = selected ? Colours.orange : (patternId ? Colours.blue : Colours.off)
  return (
    <DomGridPad
      padPressed={selectPattern}
      active={true}
      rgb={rgb}
    >
      <PushGridPad
        pad={pad}
        padPressed={selectPattern}
        rgb={rgb}
      />
    </DomGridPad>
  )
}

const mapStateToProps = (state, { patternId }) => ({
  selected: currentPattern(state).id === patternId
})

const mapDispatchToProps = (dispatch, { patternId }) => {
  return {
    selectPattern() {
      dispatch(patternButtonPressed(patternId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternSelect)
