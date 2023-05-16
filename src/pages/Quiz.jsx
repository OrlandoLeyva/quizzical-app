/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import Question from '../components/Question'

export default function Quiz(){
    const [trivia, setTrivia] = useState([])
    const [answers, setAnswers] = useState([])

    const URL = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'

    useEffect(()=>{
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                setTrivia(data.results)
            })
            .catch(() =>{
                console.log('error fetching ')
            })
    }, [])

    function saveAnswer(newAnswer){
        setAnswers((prevAnswers)=>{
            if (prevAnswers.length === 0) return [newAnswer]
            const updatedAnswersArray = prevAnswers.filter(answer => answer.id !== newAnswer.id)
            updatedAnswersArray.push(newAnswer)
            return updatedAnswersArray
        })
    }

    function checkAnswers(){
        for (const answer of answers){
            console.log(answer.correctAnswerRef.current)
            answer.correctAnswerRef.current.style = 'background-color: #94D7A2'
            if (!answer.isCorrect) answer.selected.style = 'background-color: #F8BCBC'
        }
    }

    const triviaQuestions = trivia.map((data, index) => {
        return (
            <Question 
                key={index} 
                data={data} 
                saveAnswer={saveAnswer} />
        )
    } )

    return (
        <div className="quiz-container">
            {trivia.length > 0 ? (
                triviaQuestions
            ) : <h3 className='loading-trivia'>Loading</h3>}
            <button
                onClick={checkAnswers} 
                className='check-answers-btn'>
                Check Answers
            </button>
        </div>
    )
}