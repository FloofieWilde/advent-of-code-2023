/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  ExpansionPanel,
  usePanels
} from '@react-md/expansion-panel'

const J8C1 = () => {
  const [Text, setText] = useState('Loading...')
  const [Instructions, setInstructions] = useState('Loading...')
  const [TextArr, setTextArr] = useState(['Loading...'])
  const [Steps, setSteps] = useState(['AAA'])
  const [NbSteps, setNbSteps] = useState('Loading...')

  const [panels] = usePanels({
    idPrefix: 'simple-panels',
    count: 5,
    defaultExpandedIndex: 3
  })
  const [panel1Props, panel2Props, panel3Props, panel4Props] = panels

  useEffect(() => {
    getTxt()
  }, [])

  useEffect(() => {
    getTxtArr()
  }, [Text])

  useEffect(() => {
    if (TextArr[0] !== 'Loading...') {
      if (Instructions !== 'Loading...') {
        getPath()
      }
    }
  }, [Instructions])

  const getTxt = async () => {
    setText('Loading...')
    const text = await axios.get('/files/J8C1.txt')
    setText(text.data)
  }

  const getTxtArr = () => {
    setTextArr(['Loading...'])

    const arr = Text.split('\r\n')
    const obj = {}
    const instructions = arr.splice(0, 1).toString()
    arr.splice(0, 1)

    arr.forEach((element, i) => {
      arr[i] = element.split(' = ')
      arr[i][1] = arr[i][1].split(', ')
      arr[i][1][0] = arr[i][1][0].split('').splice(1).join('')
      arr[i][1][1] = arr[i][1][1].split('').splice(0, 3).join('')
      obj[arr[i][0]] = arr[i][1]
    })

    setInstructions(instructions)
    setTextArr(obj)
  }

  const getPath = () => {
    let lastCheckpoint = 'AAA'
    let map = Instructions.split('')
    const steps = ['AAA']

    while (lastCheckpoint !== 'ZZZ') {
      if (map.length === 0) {
        map = Instructions.split('')
      }
      if (map[0] === 'L') {
        lastCheckpoint = TextArr[lastCheckpoint][0]
      } else if (map[0] === 'R') {
        lastCheckpoint = TextArr[lastCheckpoint][1]
      }

      steps.push(lastCheckpoint)
      map.splice(0, 1)
    }
    setNbSteps(steps.length - 1)
    setSteps(steps)
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
        <p className='step'>
          {Object.keys(TextArr).map((el, i) =>
            <p key="i">{`${el} - [${TextArr[el]}]`}</p>
          )}
        </p>
      </ExpansionPanel>
      <ExpansionPanel
        {...panel3Props}
        header="Check Steps"
      >
        <p className='step'>
          {Steps.map((el, i) =>
            <p key="i">{el}</p>
          )}
        </p>
      </ExpansionPanel>
      <ExpansionPanel
        {...panel4Props}
        header="Get number of steps"
      >
        <p className='step'>{NbSteps}</p>
      </ExpansionPanel>
    </div>
  )
}

export default J8C1
