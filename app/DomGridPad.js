'use strict'
import React from 'react'

const padStyleBase = {
  display: 'inline-block',
  height: 64,
  width: 64,
  marginLeft: 5,
  marginRight: 5,
  backgroundColor: '#c7ccce',
  borderRadius: 10,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '#333333',
  cursor: 'pointer'
}

const padStyleActive = (rgb) => ({
  opacity: 0.9,
  boxShadow: `inset 0px 0px 50px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`,
  borderColor: `rgba(100, 100, 100, 0.3)`
})

const padStyleLoading = (rgb) => ({
  opacity: 0.9,
  boxShadow: `inset 0px 0px 50px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`,
  borderColor: `rgba(100, 100, 100, 0.3)`
})

const DomGridPad = ({pad, active, loading = false, padPressed, rgb = [0, 100, 200]}) => (
  <div
    className='pad'
    onClick={() => padPressed && padPressed(100)}
    style={Object.assign({},
      padStyleBase,
      active ? padStyleActive(rgb) : {}
    )}
  >
    {loading &&
      <img
        src="spinner.gif"
        alt="Loading..."
        style={{
          width: '100%',
          opacity: 0.5
        }}
      />
    }
  </div>
)

export default DomGridPad
