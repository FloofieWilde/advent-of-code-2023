import React from 'react'
import Challenges from '../Challenges.json'
import { useParams } from 'react-router-dom'
import {nl2br} from '../utils/nl2br'
import parse from 'html-react-parser';
import { SolutionsMap } from '../SolutionsMap';
import Title from './Title';


const ChallengeTemplate = () => {
    const {day, chall} = useParams();
    const challenge = (chall === "1" ? Challenges[day-1].challenge1 : Challenges[day-1].challenge2);
    const Solution = SolutionsMap[`J${day}C${chall}`];

    return (
        <div>
            <div>
                <Title text={`Challenge ${day} : ${challenge.title} ${challenge.finished?"⭐":""}`}/>
                <p className='subject'>{parse(nl2br(challenge.text))}</p>
            </div>
            <div>
                <Solution/>
            </div>
        </div>
    )
}

export default ChallengeTemplate