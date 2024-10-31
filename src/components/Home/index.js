import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickStartQuizBtn = () => {
    const {history} = props
    history.replace('/quiz-game')
  }

  const renderAlertNote = () => (
    <div className="home-alert-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
        alt="warning icon"
        className="warning-icon"
      />
      <p className="warning-note">
        All the progress will be lost, if you reload during the quiz
      </p>
    </div>
  )

  return (
    <>
      <Header />
      <div className="bg-home-container">
        <div className="home-white-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="start quiz game"
            className="start-quiz-img"
          />
          <h1 className="home-heading">
            How Many Of These Questions Do You Actually Know?
          </h1>
          <p className="home-descrip">
            Test yourself with these easy quiz questions and answers
          </p>
          <button
            type="button"
            className="start-quiz-button"
            onClick={onClickStartQuizBtn}
          >
            Start Quiz
          </button>
          {renderAlertNote()}
        </div>
      </div>
    </>
  )
}

export default withRouter(Home)
