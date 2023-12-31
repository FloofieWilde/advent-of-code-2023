/* eslint-disable no-unused-vars */
// TWO PAIRS
import React, { useEffect, useState } from 'react'
import {
  ExpansionPanel,
  usePanels
} from '@react-md/expansion-panel'
import axios from 'axios'

const J7C2 = () => {
  const [Text, setText] = useState('Loading...')
  const [TextArr, setTextArr] = useState(['Loading...'])
  const [SortByGame, setSortByGame] = useState(['Loading...'])
  const [SortCompletely, setCompletely] = useState(['Loading...'])
  const [Score, setScore] = useState('Loading...')

  const [panels] = usePanels({
    idPrefix: 'simple-panels',
    count: 5,
    defaultExpandedIndex: 3
  })
  const [panel1Props, panel2Props, panel3Props, panel4Props] = panels
  const cardTypes = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  const cardTypesScores = {
    A: 13,
    K: 12,
    Q: 11,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1,
    J: 0
  }
  const cardCombo = {
    five: 6,
    four: 5,
    full: 4,
    three: 3,
    twoPair: 2,
    pair: 1,
    high: 0
  }

  useEffect(() => {
    getTxt()
  }, [])

  useEffect(() => {
    getTxtArr()
  }, [Text])

  useEffect(() => {
    if (Text !== 'Loading...') {
      orderCardsByWin()
    }
  }, [TextArr])

  useEffect(() => {
    if (SortByGame[0] !== 'Loading...') {
      orderCardsByScore()
    }
  }, [SortByGame])

  useEffect(() => {
    if (SortCompletely[0] !== 'Loading...') {
      getScore()
    }
  }, [SortCompletely])

  const getTxt = async () => {
    setText('Loading...')
    const text = await axios.get('/files/J7C1.txt')
    setText(text.data)
  }

  const getTxtArr = () => {
    setTextArr(['Loading...'])
    const arr = Text.split('\r\n')
    arr.forEach((el, i) => {
      arr[i] = el.split(' ')
    })
    arr.forEach((el2, j) => {
      arr[j][0] = el2[0].split('')
      arr[j].push(countCards(el2[0]))
    })
    setTextArr(arr)
  }
  const countCards = (hand) => {
    const cardCount = {}
    cardTypes.forEach((type) => {
      const filtered = hand.filter((card) => card === type)
      if (filtered.length !== 0) {
        cardCount[type] = filtered.length
      }
    })
    return cardCount
  }

  const orderCardsByWin = () => {
    setSortByGame(['Loading...'])
    const orderedCardsObj = {
      high: [],
      pair: [],
      twoPair: [],
      three: [],
      full: [],
      four: [],
      five: []
    }
    TextArr.forEach((type, i) => {
      const cardsCount = type[2]
      let askFull = 0
      let maxCard = 0
      let wildCardNum = 0
      Object.keys(cardsCount).forEach((key) => {
        const count = cardsCount[key]
        if (key === 'J') {
          wildCardNum = count
        } else {
          if (count === 2 || count === 3) {
            askFull += count
          }
          if (count > maxCard) {
            maxCard = count
          }
        }
      })
      if ((((askFull + wildCardNum === 5) && (wildCardNum === 0 || wildCardNum === 1)) ||
      ((askFull + wildCardNum === 4) && (wildCardNum === 1))) &&
      (askFull !== 3)) {
        orderedCardsObj.full.push(type)
      } else if (askFull === 4 && wildCardNum === 0) {
        orderedCardsObj.twoPair.push(type)
      } else {
        switch (maxCard + wildCardNum) {
          case 5:
            orderedCardsObj.five.push(type)
            break
          case 4:
            orderedCardsObj.four.push(type)
            break
          case 3:
            orderedCardsObj.three.push(type)
            break
          case 2:
            orderedCardsObj.pair.push(type)
            break
          case 1:
            orderedCardsObj.high.push(type)
            break
          default:
            break
        }
      }
    })
    setSortByGame(orderedCardsObj)
  }
  const orderCardsByScore = () => {
    setCompletely(['Loading...'])
    let orderedCardsArr = []
    Object.keys(SortByGame).forEach((key) => {
      const cards = SortByGame[key]
      // SortByGame[key].sort()
      SortByGame[key].sort(compareCards)
      orderedCardsArr = [...orderedCardsArr, ...cards]
    })

    setCompletely(orderedCardsArr)
  }
  const getScore = () => {
    setScore('Loading...')
    const score = SortCompletely.reduce((a, b, i) => {
      return a + b[1] * (i + 1)
    }, 0)
    setScore(score)
  }
  const compareCards = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < cardTypes.length; j++) {
        if (cardTypesScores[a[i][j]] !== cardTypesScores[b[i][j]]) {
          return cardTypesScores[a[i][j]] - cardTypesScores[b[i][j]]
        }
      }
    }
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
              { TextArr[0] === 'Loading...'
                ? 'Loading...'
                : TextArr.map((el, i) =>
                <p key="i">{`${el[0]} - ${el[1]}`}</p>
                ) }
            </p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel3Props}
            header="Process the data to order it"
          >
            <p className='step'>
              { SortCompletely[0] === 'Loading...'
                ? 'Loading...'
                : SortCompletely.map((el, i) =>
                <p key="i">{`${el[0]} - ${el[1]}`}</p>
                )}
            </p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel4Props}
            header="Calculate the score"
          >
            <p className='step'>
              Score : {Score}
            </p>
          </ExpansionPanel>
    </div>
  )
}

export default J7C2
