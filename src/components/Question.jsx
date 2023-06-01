/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react"

import {v4 as uuidv4} from 'uuid';
import he from 'he'

export default function Question(props){
    const [selected, setSelected] = useState(null)
    const [randomAnswers, setRandomAnswers] = useState([])
    const [questionId] = useState(()=> uuidv4())
    const {data, saveAnswer} = props
    function select(e){
        setSelected(prevSelected =>{
            if (prevSelected) prevSelected.classList.remove('selected')
            e.target.classList.add('selected')
            return e.target
        })
    }

    // console.log('rendering button')
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

    useEffect(()=>{
        const dataAnswers = [...data.incorrect_answers, data.correct_answer]
        const randomAnswers = []
        const takenNumbers = []
        while (randomAnswers.length < dataAnswers.length) {
            let randomNum = Math.floor(Math.random() * dataAnswers.length)
            if (!takenNumbers.includes(randomNum)){
                takenNumbers.push(randomNum)
                randomAnswers.push(dataAnswers[randomNum])
            }
        }

        setRandomAnswers(randomAnswers)
    }, [])

    const correctAnswerRef = useRef()

    return (
        <div className="quiz-item">
            <h2 className="quiz-question">{he.decode(data.question)}</h2>
            <div className="quiz-options">
            { randomAnswers.map((answer, index) => {
                return (
                    answer == data.correct_answer ?
                     (<button 
                        key={index}
                        ref={correctAnswerRef}
                        onClick={select}>
                    {he.decode(data.correct_answer)}
                    </button>) 
                    
                    : <button className="button" onClick={select} key={index}>{he.decode(answer)}</button>
                )
            } )}  

            </div>
        </div>
    )
}

Question.ReactPropTypes

{/* <button 
                ref={correctAnswerRef}
                onClick={select}>{he.decode(data.correct_answer)}</button> */}