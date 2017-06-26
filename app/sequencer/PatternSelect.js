'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { createPatternWithCurrentKit, selectPattern } from './patternActions'
import DomGridButton from '../push/DomGridButton'
import PushGridSelectButton from '../push/PushGridSelectButton'
import { Colours } from '../push/colours'
import { currentPattern } from '../selectors'

const PatternSelect = props => {
  const {button, patternId, selectPattern, selected} = props
  return (
    <DomGridButton
      onPressed={selectPattern}
      active={true}
      rgb={selected ? Colours.blue : (patternId ? Colours.orange : Colours.off)}
    >
      <PushGridSelectButton
        button={button}
        onPressed={selectPattern}
        rgb={selected ? Colours.blue : (patternId ? Colours.orange : Colours.off)}
      />
    </DomGridButton>
  )
}

const mapStateToProps = (state, { patternId }) => ({
  selected: currentPattern(state).id === patternId
})

const mapDispatchToProps = (dispatch, { patternId }) => {
  return {
    selectPattern() {
      const toSelect = patternId || dispatch(createPatternWithCurrentKit())
      dispatch(selectPattern(toSelect))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternSelect)
