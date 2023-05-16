import {Link} from 'react-router-dom'

export default function Intro(){
    return (
        <div className="intro-page">
            <h1 className="title">Quizzical</h1>
            <p className="game-description">
                Try to answer all the question of the Quiz
            </p>
            <Link className='start-quiz-cta' to='/quiz'>
                Start Quiz
            </Link>
        </div>
    )
}