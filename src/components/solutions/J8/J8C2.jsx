/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  ExpansionPanel,
  usePanels
} from '@react-md/expansion-panel'

const J8C2 = () => {
  const [Text, setText] = useState('Loading...')
  const [Instructions, setInstructions] = useState('Loading...')
  const [TextArr, setTextArr] = useState(['Loading...'])
  const [Steps, setSteps] = useState(['AAA'])
  const [NbStepsAll, setNbStepsAll] = useState('Loading...')
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

  const getAllLastCheckpoint = () => {
    const arr = []
    Object.keys(TextArr).forEach((el, i) => {
      if (el.endsWith('A')) {
        arr.push(el)
      }
    })
    return arr
  }

  const solver = (lastCheckpoint) => {
    let map = Instructions.split('')
    console.log('hi')

    const steps = [lastCheckpoint]

    while (!lastCheckpoint.endsWith('Z')) {
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
    return steps
  }

  const PGCD = (a, b) => {
    return b ? PGCD(b, a % b) : a
  }
  const PPCM = (a, b) => {
    return a * b / PGCD(a, b)
  }

  const getPath = () => {
    let lastCheckpoint = getAllLastCheckpoint()
    let solved = []
    let nbPathSolved = []

    for (let i = 0; i < lastCheckpoint.length; i++) {
      solved.push(solver(lastCheckpoint[i]))
      nbPathSolved.push(solved[i].length - 1)
    }

    const minimalSteps = nbPathSolved.reduce((a, b) => PPCM(a, b))

    setSteps(solved)
    setNbStepsAll(nbPathSolved)
    setNbSteps(minimalSteps)
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
        header="Calcultate steps for each path"
      >
        <p className='step'>
          {Object.keys(Steps).map((el, i) =>
            <p key="i">{`${Steps[i][0]} - ${NbStepsAll[i]}`}</p>
          )}
        </p>
      </ExpansionPanel>
      <ExpansionPanel
        {...panel4Props}
        header="Calculate minimal steps for all (least common multiple)"
      >
        <p className='step'>{NbSteps}</p>
      </ExpansionPanel>
    </div>
  )
}

export default J8C2
