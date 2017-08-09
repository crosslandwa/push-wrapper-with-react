'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { createOrCopyThenSelectPattern } from './patternActions'
import DomGridPad from '../push/DomGridPad'
import PushGridPad from '../push/PushGridPad'
import { Colours } from '../push/colours'
import { currentPattern } from '../selectors'

const PatternSelect = props => {
  const {pad, patternId, selectPattern, selected} = props
  return (
    <DomGridPad
      padPressed={selectPattern}
      active={true}
      rgb={selected ? Colours.blue : (patternId ? Colours.orange : Colours.off)}
    >
      <PushGridPad
        pad={pad}
        padPressed={selectPattern}
        rgb={selected ? Colours.blue : (patternId ? Colours.orange : Colours.off)}
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
      dispatch(createOrCopyThenSelectPattern(patternId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternSelect)
