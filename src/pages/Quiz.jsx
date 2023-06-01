/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import Question from '../components/Question'

export default function Quiz(){
    const [trivia, setTrivia] = useState([])
    const [getNewTrivia, setGetNewTrivia] = useState(true)
    const [correctAnswers, setCorrectAnswers] = useState('')
    const [answers, setAnswers] = useState([])
    const [selectAllError, setSelectAllError] = useState(false)
    const [gameOver, setGameOver] = useState(false)

    const URL = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'

    useEffect(()=>{
        if (getNewTrivia === true) {
            fetch(URL)
            .then(res => res.json())
            .then(data => {
                setTrivia(data.results)
                setGetNewTrivia(false)
            })
            .catch(() =>{
                //! Make the error handler
                console.log('error fetching ')
            })
        }
    }, [getNewTrivia])

    function saveAnswer(newAnswer){
        setAnswers((prevAnswers)=>{
            if (prevAnswers.length === 0) return [newAnswer]
            const updatedAnswersArray = prevAnswers.filter(answer => answer.id !== newAnswer.id)
            updatedAnswersArray.push(newAnswer)
            return updatedAnswersArray
        })
    }

    function checkAnswers(){
        if (trivia.length === answers.length) {
            let correctAnswers = 0
            for (const answer of answers){
                if (answer.isCorrect) {
                    
                    correctAnswers++}
                answer.correctAnswerRef.current.style = 'background-color: #94D7A2'
                if (!answer.isCorrect) answer.selected.style = 'background-color: #F8BCBC'
            }
            setCorrectAnswers(`${correctAnswers} / ${trivia.length} correct`)
            setSelectAllError(false)
            setGameOver(true)
        } else {
            setSelectAllError(true)
        }
        
    }


    function newTrivia() {
        window.location.reload()

    }

    const triviaQuestions = trivia.map((data, index) => {
        return (
            <Question 
                key={index} 
                data={data} 
                saveAnswer={saveAnswer} />
        )
    } )

    if (trivia.length == 0) return <h3 className='loading-trivia'>Loading, please wait...</h3>
    

    return (
        <div className="quiz-container">
            {triviaQuestions}
            {gameOver && <p className='correct-answers-message'>{correctAnswers}</p>}
            {selectAllError && <p className='select-all-message'>Please, select all the options</p>}
            <div className='bottom-buttons'>
                <button
                    onClick={checkAnswers} 
                    className='check-answers-btn'>
                    Check Answers
                </button>

                {gameOver && <button onClick={newTrivia} className='play-again-btn'> Play again </button>}
            </div>
        </div>
    )
}