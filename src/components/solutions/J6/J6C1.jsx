import React, { useEffect, useState } from 'react'
import {
  ExpansionPanel,
  usePanels
} from '@react-md/expansion-panel'
import axios from 'axios'

const J6C1 = () => {
  const [Text, setText] = useState('Loading...')
  const [TextArr, setTextArr] = useState(['Loading...'])
  const [PossibilitiesArr, setPossibilitiesArr] = useState(['Loading...'])

  const [panels, onKeyDown] = usePanels({
    idPrefix: 'simple-panels',
    count: 5,
    defaultExpandedIndex: 3
  })
  const [panel1Props, panel2Props, panel3Props, panel4Props, panel5Props] = panels

  useEffect(() => {
    getTxt()
  }, [])

  useEffect(() => {
    getTxtArr()
  }, [Text])

  useEffect(() => {
    if (TextArr[0] !== 'Loading...') {
      getPossibilitiesArr()
    }
  }, [TextArr])

  useEffect(() => {
    if (TextArr[0] !== 'Loading...') {
      getCalc()
    }
  }, [PossibilitiesArr])

  const getTxt = async () => {
    setText('Loading...')
    const text = await axios.get('/files/J6C1.txt')
    setText(text.data)
  }
  const getTxtArr = () => {
    setTextArr(['Loading...'])
    const arr = Text.split('\r\n')
    if (arr[0] !== 'Loading...') {
      arr.map((el, i) => {
        arr[i] = arr[i].match(/\d+/g)
        for (let j = 0; j < arr[i].length; j++) {
          arr[i][j] = +arr[i][j]
        }
        return 0
      })
    }
    setTextArr(arr)
  }
  const getPossibilitiesArr = () => {
    setPossibilitiesArr(['Loading...'])
    const arr = []
    for (let i = 0; i < TextArr[0].length; i++) {
      arr.push(0)
      const time = TextArr[0][i]
      const record = TextArr[1][i]
      for (let speed = 1; speed < time; speed++) {
        const distance = speed * (time - speed)
        if (distance > record) {
          arr[i]++
        }
      }
    }
    setPossibilitiesArr(arr)
  }
  const getCalc = () => {
  }

  return (
    <div>
      <ExpansionPanel
            {...panel1Props}
            header="Import file"
          >
            <p className='step'>{Text}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel2Props}
            header="File processing in Array"
          >
            <p className='step'>{TextArr.map((el, i) => (
              <p key={i}>
                {TextArr[0] !== 'Loading...'
                  ? el.map((el, i) => (
                  <span key={i}>{el} </span>
                  ))
                  : el}
              </p>
            ))}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel3Props}
            header="Get number of possibilities"
          >
            <p className='step'>{PossibilitiesArr[0] !== 'Loading...'
              ? PossibilitiesArr.map((el, i) => (
              <p key={i}>
                <p>Race {i + 1}:</p>
                <p>Time: {TextArr[0][i] ?? ''}</p>
                <p>Record: {TextArr[1][i] ?? ''}</p>
                <p>Possibilities: {el ?? ''}</p>
                <p>-------------------</p>
              </p>
              ))
              : PossibilitiesArr[0]}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel4Props}
            header="Calculate the number of possibilities"
          >
            <p className='step'>
              {
                PossibilitiesArr[0] !== 'Loading...'
                  ? PossibilitiesArr.reduce((a, b) => a * b, 1)
                  : 0
              }
            </p>
          </ExpansionPanel>
    </div>
  )
}

export default J6C1
