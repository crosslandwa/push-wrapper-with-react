'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { createPatternWithCurrentKit, selectPattern, selectKitForCurrentPattern } from '../sequencer/patternActions'
import DomGridButton from '../push/DomGridButton'
import PushChannelSelectButton from '../push/PushChannelSelectButton'
import { Colours } from '../push/colours'
import { currentPattern } from '../selectors'

const KitSelectButton = props => {
  const {button, selectKit, selected} = props
  return (
    <DomGridButton
      onPressed={selectKit}
      active={selected}
      rgb={selected ? Colours.green : Colours.off}
    >
      <PushChannelSelectButton
        button={button}
        onPressed={selectKit}
        rgb={selected ? Colours.green : Colours.off}
      />
    </DomGridButton>
  )
}

const mapStateToProps = (state, { kitId }) => ({
  selected: currentPattern(state).kitId === kitId
})

const mapDispatchToProps = (dispatch, { kitId }) => {
  return {
    selectKit() {
      dispatch(selectKitForCurrentPattern(kitId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KitSelectButton)
