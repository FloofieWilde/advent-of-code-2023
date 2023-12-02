import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  ExpansionList,
  ExpansionPanel,
  usePanels,
} from "@react-md/expansion-panel";
const J1C1 = () => {
  
  const [Text, setText] = useState("Loading...")
  const [TextArr, setTextArr] = useState(["Loading..."])
  const [NumArr, setNumArr] = useState([])
  const [Calibration, setCalibration] = useState(0)

  const [panels, onKeyDown] = usePanels({
    idPrefix: "simple-panels",
    count: 4,
    defaultExpandedIndex: 3,
  });

  const [panel1Props, panel2Props, panel3Props, panel4Props] = panels;

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

  const getNumbers = () => {
    setNumArr([]);
    let numArr = [];
    TextArr.forEach(element => {
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
    getNumbers()
  }, [TextArr]);

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
            header="Traitement file"
          >
            <p className='step'>{TextArr.map((el, i) => (
              <p key={i}>{el}</p>
            ))}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel3Props}
            header="Get numbers"
          >
            <p className='step'>{NumArr.map((el, i) => (
              <p key={i}>{el}</p>
            ))}</p>
          </ExpansionPanel>
          <ExpansionPanel
            {...panel4Props}
            header="Calculate calibration"
          >
            <p className='step'>{Calibration}</p>
          </ExpansionPanel>
        </ExpansionList>
      </div>
    </div>
  )
}

export default J1C1