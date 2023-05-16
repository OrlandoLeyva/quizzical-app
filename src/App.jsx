// import {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
// PAGES
import Intro from './pages/Intro'
import Quiz from './pages/Quiz'

export default function App() {
    // const [isQuizRunning, setIsQuizRunning] = useState(false)

    return (
      <div id='app'>
        <Routes>
            <Route index path='/' element={<Intro/>} />
            <Route path='/quiz' element={<Quiz/>}  />
        </Routes>
      </div>
    )
}