import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import ChallengeTitle from '../components/ChallengeTitle'
import Challenges from '../Challenges.json'

const Home = () => {
    const [Titles, setTitles] = useState([])
    
    useEffect(() => {
            setTitles([])
        for(let i = 0; i < Challenges.length; i++) {
            setTitles(prevState => [...prevState, <><Title key={i} text={`Jour ${i+1} :`} /><ChallengeTitle page={i+1} Challenges={Challenges[i]}/></>])
        }
    }, [])
    

    return (
        <div className='title'>
            {Titles}
        </div>
    )
}

export default Home