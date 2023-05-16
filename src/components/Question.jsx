/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"

export default function Question(props){
    const [selected, setSelected] = useState(null)
    const {data} = props

    function select(e){
        setSelected(prevSelected =>{
            if (prevSelected) prevSelected.classList.remove('selected')
            e.target.classList.add('selected')
            return e.target
        })
    }

    return (
        <div className="quiz-item">
            <h2 className="quiz-question">{data.question}</h2>
            <div className="quiz-options">
            { data.incorrect_answers.map((incorrectAnswer, index) => {
                return (
                    <button className="button" onClick={select} key={index}>{incorrectAnswer}</button>
                )
            } )}    
            <button onClick={select}>{data.correct_answer}</button>
            </div>
        </div>
    )
}

Question.ReactPropTypes