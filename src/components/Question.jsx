/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react"
import {v4 as uuidv4} from 'uuid';

export default function Question(props){
    const [selected, setSelected] = useState(null)
    const [questionId] = useState(()=> uuidv4())
    const {data, saveAnswer} = props
    function select(e){
        setSelected(prevSelected =>{
            if (prevSelected) prevSelected.classList.remove('selected')
            e.target.classList.add('selected')
            return e.target
        })
    }

    useEffect(()=>{
        if (selected){
            saveAnswer({
                    id: questionId,
                    correctAnswerRef,
                    selected,
                    isCorrect: selected == correctAnswerRef.current
                }
            )
        }
    }, [selected])


    const correctAnswerRef = useRef()

    return (
        <div className="quiz-item">
            <h2 className="quiz-question">{data.question}</h2>
            <div className="quiz-options">
            { data.incorrect_answers.map((incorrectAnswer, index) => {
                return (
                    <button className="button" onClick={select} key={index}>{incorrectAnswer}</button>
                )
            } )}    
            <button 
                ref={correctAnswerRef}
                onClick={select}>{data.correct_answer}</button>
            </div>
        </div>
    )
}

Question.ReactPropTypes