import React, { Children } from 'react'

const FlexVertical = () => {
  return (
    <div style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'left',
    }}>
        {Children}
    </div>
  )
}

export default FlexVertical