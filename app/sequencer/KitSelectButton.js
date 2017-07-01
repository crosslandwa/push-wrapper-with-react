'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { createPatternWithCurrentKit, selectPattern, selectKitForCurrentPattern } from './patternActions'
import DomGridButton from '../push/DomGridButton'
import PushChannelSelectButton from '../push/PushChannelSelectButton'
import { Colours } from '../push/colours'
import { currentPattern } from '../selectors'
import { createDefaultKit } from '../kits/actions'

const KitSelectButton = props => {
  const {button, kitId, selectKit, selected} = props
  return (
    <DomGridButton
      onPressed={selectKit}
      active={!!kitId}
      rgb={selected ? Colours.green : !!kitId ? Colours.orange : Colours.off}
    >
      <PushChannelSelectButton
        button={button}
        onPressed={selectKit}
        rgb={selected ? Colours.green : !!kitId ? Colours.orange : Colours.off}
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
      const toSelect = kitId || dispatch(createDefaultKit())
      dispatch(selectKitForCurrentPattern(toSelect))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KitSelectButton)
