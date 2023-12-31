import React, { useEffect, useState } from 'react'
import {
  ExpansionPanel,
  usePanels
} from '@react-md/expansion-panel'
import axios from 'axios'

const J4C2 = () => {
  const [Text, setText] = useState('Loading...')
  const [TextArr, setTextArr] = useState(['Loading...'])
  const [ObjectArr, setObjectArr] = useState(['Loading...'])
  const [Filtered, setFiltered] = useState(['Loading...'])
  const [Counter, setCounter] = useState(['Loading...'])
  const [Score, setScore] = useState(0)

  const [panels] = usePanels({
    idPrefix: 'simple-panels',
    count: 5,
    defaultExpandedIndex: 4
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
      getObjArr()
    }
  }, [TextArr])

  useEffect(() => {
    if (TextArr[0] !== 'Loading...') {
      getFiltred()
    }
  }, [ObjectArr])

  useEffect(() => {
    if (TextArr[0] !== 'Loading...') {
      getScratchCardsNum()
    }
  }, [Filtered])

  const getTxt = async () => {
    setText('Loading...')
    const text = await axios.get('/files/J4C1.txt')
    setText(text.data)
  }
  const getTxtArr = () => {
    setTextArr(['Loading...'])
    const arr = Text.split('\r\n')
    setTextArr(arr)
  }
  const getObjArr = () => {
    setObjectArr(['Loading...'])
    const regex = /\s+/g
    const arr = []
    const retArr = []
    TextArr.map((el, i) => {
      arr.push(el.split(': '))
      arr[i][1] = arr[i][1].split(' | ')
      arr[i][1].map((el, j) => {
        arr[i][1][j] = el.split(regex)
        arr[i][1][j].map((str, k) => {
          if (arr[i][1][j][0] === '') {
            arr[i][1][j].splice(0, 1)
          }
          return 0
        })
        return 0
      })
      return 0
    })
    arr.map((el, i) => {
      retArr.push(el[1])
      return 0
    })
    setObjectArr(retArr)
  }
  const getFiltred = () => {
    setFiltered(['Loading...'])
    const arr = []
    const countArr = []
    ObjectArr.forEach((el, i) => {
      const retour = el[1].filter((el2, j) => {
        if (el[0].includes(el2)) {
          return true
        }
        return false
      })
      arr.push(retour)
      countArr.push(+retour.length)
    })
    setFiltered(arr)
    setCounter(countArr)
  }

  const getScratchCardsNum = () => {
    let num = 0
    const scratch = []
    for (let i = 0; i < 223; i++) {
      scratch.push(1)
    }

    Counter.forEach((nombreDeCartesGagnées, index) => {
      for (let i = 0; i < nombreDeCartesGagnées; i++) {
        scratch[index + i + 1] += scratch[index]
      }
    })

    num = scratch.reduce((a, b) => a + b)

    setScore(num)
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
            header="File processing in Number Array"
          >
            <p className='step'>
                {ObjectArr[0] !== 'Loading...'
                  ? ObjectArr.map((el, i) => (
                    el.map((el2, j) => (
                        <p key={j}>
                        {el2.map((el3, k) => (
                          el3 + ' '
                        ))}
                        </p>
                    ))
                  ))
                  : ''}
            </p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel4Props}
            header="Filter this bad bitch"
          >
            <p className='step'>
                { Filtered[0] !== 'Loading...'
                  ? Filtered.map((el, i) => (
                        <p key={i}> {Counter[i]} :&nbsp;
                            {el.map((el2, j) => (
                                <span key={j}>{el2}&nbsp;</span>
                            ))}
                        </p>
                  ))
                  : ''
                }
            </p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel5Props}
            header="Get the total amount of cards"
          >
            <p className='step'>
                The final number of cards is {Score}
            </p>
          </ExpansionPanel>
    </div>
  )
}

export default J4C2
