/* eslint-disable no-unused-vars */
// TWO PAIRS
import React, { useEffect, useState } from 'react'
import {
  ExpansionPanel,
  usePanels
} from '@react-md/expansion-panel'
import axios from 'axios'

const J7C1 = () => {
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
  const cardTypesRev = cardTypes
  cardTypesRev.reverse()
  const cardTypesScores = {
    A: 13,
    K: 12,
    Q: 11,
    J: 10,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1
  }
  const cardCombo = {
    five: 6,
    four: 5,
    full: 4,
    three: 3,
    twoPair: 2,
    two: 1,
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
      five: [],
      four: [],
      full: [],
      three: [],
      twoPair: [],
      two: [],
      high: []
    }
    TextArr.forEach((type, i) => {
      const cardsCount = type[2]
      let askFull = 0
      let maxCard = 0
      Object.keys(cardsCount).forEach((key) => {
        const count = cardsCount[key]
        if (count === 2 || count === 3) {
          askFull += count
        }
        if (count > maxCard) {
          maxCard = count
        }
      })
      if (askFull === 5) {
        orderedCardsObj.full.push(type)
      } else if (askFull === 4) {
        orderedCardsObj.twoPair.push(type)
      } else {
        switch (maxCard) {
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
            orderedCardsObj.two.push(type)
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
    const orderedCardsArr = []
    Object.keys(SortByGame).reverse().forEach((key) => {
      const orderByComboCard = {}
      cardTypesRev.forEach((type) => {
        orderByComboCard[type] = []
      })
      const type = SortByGame[key]
      type.forEach((hand) => {
        const countedCards = hand[2]
        let highestCard = 2
        let combo = 0
        Object.keys(countedCards).forEach((key2) => {
          if (countedCards[key2] === combo) {
            if (cardTypesScores[key2] > cardTypesScores[highestCard]) {
              highestCard = key2
            }
          } else if (countedCards[key2] > combo) {
            combo = countedCards[key2]
            highestCard = key2
          }
        })
        // eslint-disable-next-line no-unused-expressions
        typeof hand[0] === 'string' ? null : hand[0] = hand[0].join('')
        orderByComboCard[highestCard].push(hand)
      })
      Object.keys(orderByComboCard).forEach((key3) => {
        orderByComboCard[key3] = orderByComboCard[key3].sort()
      })
      cardTypesRev.forEach((type2) => {
        orderedCardsArr.push(...orderByComboCard[type2])
      })
    })
    console.log(orderedCardsArr)
    setCompletely(orderedCardsArr)
  }
  const getScore = () => {
    setScore('Loading...')
    const score = SortCompletely.reduce((a, b, i) => { return a + b[1] * (i + 1) }, 0)
    console.log(score)
    console.log(248105065)
    setScore(score)
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
              Score : {Score} <br/>
              Cherché : 248105065
            </p>
          </ExpansionPanel>
    </div>
  )
}

export default J7C1
