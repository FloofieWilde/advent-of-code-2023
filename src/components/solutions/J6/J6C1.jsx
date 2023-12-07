import React, { useEffect, useState } from 'react'
import {
    ExpansionPanel,
    usePanels,
  } from "@react-md/expansion-panel";
import axios from 'axios';

const J6C1 = () => {
    const [Text, setText] = useState("Loading...")
    const [TextArr, setTextArr] = useState(["Loading..."])
    const [ObjectArr, setObjectArr] = useState(["Loading..."])

    const [panels, onKeyDown] = usePanels({
        idPrefix: "simple-panels",
        count: 5,
        defaultExpandedIndex: 3,
      });
      const [panel1Props, panel2Props, panel3Props, panel4Props, panel5Props] = panels;
    
    useEffect(() => {
        getTxt()
    }, []);

    useEffect(() => {
        getTxtArr()
    }, [Text]);

    useEffect(() => {
    if(TextArr[0] !== "Loading...") {
        // getObjArr()
    }
    }, [TextArr]);

    const getTxt = async () => {
        setText("Loading...")
        const text = await axios.get("/files/J6C1.txt")
        setText(text.data)
      }
    const getTxtArr = () => {
        setTextArr(["Loading..."])
        let arr = Text.split("\r\n")
        if(arr[0] !== "Loading...") {
            arr.map((el, i) => {
                arr[i] = arr[i].match(/\d+/g);
                for(let j = 0; j < arr[i].length; j++) {
                    arr[i][j] = +arr[i][j]
                }
            })
        }
        setTextArr(arr)
        console.log("TextArr", arr)
    }
  return (
    <div>J6C1</div>
  )
}

export default J6C1