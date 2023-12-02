import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  ExpansionList,
  ExpansionPanel,
  usePanels,
} from "@react-md/expansion-panel";

const J1C2 = () => {
  
  const [Text, setText] = useState("Loading...")
  const [TextArr, setTextArr] = useState(["Loading..."])
  const [TextToNum, setTextToNum] = useState([])
  const [NumArr, setNumArr] = useState([])
  const [Calibration, setCalibration] = useState(0)
  const dictNumToLetter = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "zero": 0
  }

  const [panels, onKeyDown] = usePanels({
    idPrefix: "simple-panels",
    count: 5,
    defaultExpandedIndex: 3,
  });

  const [panel1Props, panel2Props, panel3Props, panel4Props, panel5Props] = panels;

  const getTxt = async () => {
    setText("Loading...")
    const text = await axios.get("/files/J1C1.txt")
    setText(text.data)
  }

  const getTxtArr = () => {
    setTextArr(["Loading..."])
    const arr = Text.split("\r\n")
    setTextArr(arr)
  }

  const getTxtToNum = () => {
    setTextToNum(["Loading..."]);
    let textToNum = [];
    TextArr.forEach(element => {
      const regex = new RegExp(Object.keys(dictNumToLetter).join('|'), 'gi');
      textToNum.push(element.replace(regex, match => dictNumToLetter[match.toLowerCase()]))
    });
    setTextToNum(textToNum);
  }

  const getNumbers = () => {
    setNumArr([]);
    let numArr = [];
    TextToNum.forEach(element => {
      const regex = /\d+/g;
      let numInStr = element.match(regex);
      numInStr ? numInStr = numInStr.toString() : numInStr = null;
      const firstNum = numInStr ? numInStr[0] : null;
      const lastNum = numInStr ? numInStr[numInStr.length - 1] : null;
      const num = `${firstNum}${lastNum}`
      numArr.push(+num);
    });
    setNumArr(numArr);
  }

  const calcCalibration = () => {
    let sum = 0;
    for(let i = 0; i < NumArr.length; i++) {
      sum += NumArr[i];
    }
    setCalibration(sum);
  }

  useEffect(() => {
    getTxtArr()
  }, [Text]);

  useEffect(() => {
    getTxtToNum()
  }, [TextArr]);

  useEffect(() => {
    getNumbers()
  }, [TextToNum]);

  useEffect(() => {
    calcCalibration()
  }, [NumArr]);

  useEffect(() => {
    getTxt()
  }, [])

  return (
    <div>
      <div>
        <ExpansionList onKeyDown={onKeyDown}>
          <ExpansionPanel
            {...panel1Props}
            header="Import file"
          >
            <p className='step'>{Text}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel2Props}
            header="File in array"
          >
            <p className='step'>{TextArr.map((el, i) => (
              <p key={i}>{el}</p>
            ))}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel3Props}
            header="Letter to number"
          >
            <p className='step'>{TextToNum.map((el, i) => (
              <p key={i}>{el}</p>
            ))}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel4Props}
            header="Get numbers"
          >
            <p className='step'>{NumArr.map((el, i) => (
              <p key={i}>{el}</p>
            ))}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel5Props}
            header="Calculate calibration"
          >
            <p className='step'>{Calibration}</p>
          </ExpansionPanel>
        </ExpansionList>
      </div>
    </div>
  )
}

export default J1C2