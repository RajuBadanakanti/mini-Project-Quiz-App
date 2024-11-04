import {Component} from 'react'
import Header from '../Header'
import './index.css'

class QuizResults extends Component {
  renderGameResultSuccessView = () => (
    <div className="game-result-success-container">
      <div className="game-result-success-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
          alt="congrats"
          className="game-result-success-trophy"
        />
        <h1 className="game-result-success-header">Congrats!</h1>
        <h1 className="game-result-success-result-header">
          90% Correctly Answered
        </h1>
        <p className="quiz-result-status-para">Quiz completed successfully.</p>
        <p className="quiz-result-attempted-para">
          You attempted 9 out of 10 questions as correct.
        </p>
        <button type="button" className="game-result-report-button">
          Report
        </button>
      </div>
    </div>
  )

  renderGameResultFailureView = () => (
    <div className="game-result-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
        alt="lose"
        className="game-result-failure-img"
      />
      <h1 className="game-result-failure-header">You Lose!</h1>
      <h1 className="game-result-failure-result-header">
        30% Correctly Answered
      </h1>
      <p className="quiz-result-failure-attempted-para">
        You attempted 4 out of 10 questions as correct.
      </p>
      <button type="button" className="game-result-report-button">
        Report
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="bg-game-results-container">
          <div className="game-results-white-container">
            {this.renderGameResultSuccessView()}
            {this.renderGameResultFailureView()}
          </div>
        </div>
      </>
    )
  }
}

export default QuizResults
