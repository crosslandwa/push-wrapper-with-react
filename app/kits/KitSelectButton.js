'use strict'
import React from 'react'
import { connect } from 'react-redux'
import DomGridButton from '../push/DomGridButton'
import PushChannelSelectButton from '../push/PushChannelSelectButton'
import { Colours } from '../push/colours'
import { currentPattern } from '../selectors'
import { copyIfDuplicateHeldThenSelectKitForCurrentPattern } from './actions'

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
      dispatch(copyIfDuplicateHeldThenSelectKitForCurrentPattern(kitId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KitSelectButton)
