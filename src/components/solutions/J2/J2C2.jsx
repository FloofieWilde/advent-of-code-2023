import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  ExpansionPanel,
  usePanels
} from '@react-md/expansion-panel'

const J2C2 = () => {
  const [Text, setText] = useState('Loading...')
  const [TextArr, setTextArr] = useState(['Loading...'])
  const [ObjectArr, setObjectArr] = useState(['Loading...'])
  const [Powers, setPowers] = useState(['Loading...'])

  const [panels, onKeyDown] = usePanels({
    idPrefix: 'simple-panels',
    count: 5,
    defaultExpandedIndex: 3
  })
  const [panel1Props, panel2Props, panel3Props, panel4Props, panel5Props] = panels

  const searchedCubes = {
    red: 12,
    blue: 14,
    green: 13
  }

  useEffect(() => {
    getTxt()
  }, [])

  useEffect(() => {
    getTxtArr()
  }, [Text])

  useEffect(() => {
    if (TextArr[0] !== 'Loading...') {
      getObjArr()
    }
  }, [TextArr])

  useEffect(() => {
    if (ObjectArr[0] !== 'Loading...') {
      getPowers()
    }
  }, [ObjectArr])

  const getTxt = async () => {
    setText('Loading...')
    const text = await axios.get('/files/J2C1.txt')
    setText(text.data)
  }
  const getTxtArr = () => {
    setTextArr(['Loading...'])
    const arr = Text.split('\r\n')
    setTextArr(arr)
  }
  const getObjArr = () => {
    setObjectArr(['Loading...'])
    const arr = []
    TextArr.forEach(element => {
      const obj = {
        game: 0,
        color: {
          red: 0,
          blue: 0,
          green: 0
        }
      }

      element = element.replace('Game ', '')
      const splittedPrompt = element.split(': ')
      obj.game = parseInt(splittedPrompt[0])
      splittedPrompt[1] = splittedPrompt[1].split('; ')

      for (let i = 0; i < splittedPrompt[1].length; i++) {
        splittedPrompt[1][i] = splittedPrompt[1][i].split(', ')
        for (let j = 0; j < splittedPrompt[1][i].length; j++) {
          splittedPrompt[1][i][j] = splittedPrompt[1][i][j].split(' ')
          splittedPrompt[1][i][j][0] = parseInt(splittedPrompt[1][i][j][0])
          if (splittedPrompt[1][i][j][1] === 'red') {
            if (splittedPrompt[1][i][j][0] > obj.color.red) {
              obj.color.red = splittedPrompt[1][i][j][0]
            }
          } else if (splittedPrompt[1][i][j][1] === 'blue') {
            if (splittedPrompt[1][i][j][0] > obj.color.blue) {
              obj.color.blue = splittedPrompt[1][i][j][0]
            }
          } else if (splittedPrompt[1][i][j][1] === 'green') {
            if (splittedPrompt[1][i][j][0] > obj.color.green) {
              obj.color.green = splittedPrompt[1][i][j][0]
            }
          }
        }
      }

      arr.push(obj)
    })

    setObjectArr(arr)
  }
  const getPowers = () => {
    setPowers(['Loading...'])
    const arr = []
    ObjectArr.forEach(element => {
      const power = parseInt(element.color.red) * parseInt(element.color.blue) * parseInt(element.color.green)
      arr.push(power)
    })
    console.log(arr)
    setPowers(arr)
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
              <p key={i}>{el}</p>
            ))}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel3Props}
            header="File processing in Object Array"
          >
            <p className='step'>{ObjectArr.map((el, i) => (
              <p key={i}>
                game: {el.game}<br/>
                red: {el.color?.red}<br/>
                blue: {el.color?.blue}<br/>
                green: {el.color?.green}<br/><br/>
              </p>
            ))}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel4Props}
            header="Calculating the sum of powers"
          >
            <p className='step'>
              Power : {Powers.reduce((a, b) => a + b)}
            </p>
          </ExpansionPanel>
    </div>
  )
}

export default J2C2
