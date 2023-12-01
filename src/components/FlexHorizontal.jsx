import React from 'react'

const FlexHorizontal = ({component}) => {
  return (
    <div style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'left',
    }}>
        {component}
    </div>
  )
}

export default FlexHorizontal