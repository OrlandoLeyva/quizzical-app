import {useState, useEffect} from 'react'
import Question from '../components/Question'

export default function Quiz(){
    const [trivia, setTrivia] = useState([])

    const URL = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'

    useEffect(()=>{
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                console.log(data.results)
                setTrivia(data.results)
            })
            .catch(() =>{
                console.log('error fetching ')
            })
    }, [])


    const triviaQuestions = trivia.map((data, index) => <Question key={index} data={data} /> )

    return (
        <div className="quiz-container">
            {trivia.length > 0 ? (
                triviaQuestions
            ) : <h3 className='loading-trivia'>Loading</h3>}
            <button className='check-answers-btn'>Check Answers</button>
        </div>
    )
}