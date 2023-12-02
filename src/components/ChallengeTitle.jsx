import React from 'react'
import { Link } from 'react-router-dom'

const ChallengeTitle = ({page, Challenges}) => {
  return (
    <div>
        <Link to={`/${page}/1`}>Challenge 1 : {Challenges.challenge1.title}</Link> {Challenges.challenge1.finished?"⭐":""}
        <br/>
        <Link to={`/${page}/2`}>Challenge 2 : {Challenges.challenge2.title}</Link> {Challenges.challenge2.finished?"⭐":""}
    </div>
  )
}

export default ChallengeTitle