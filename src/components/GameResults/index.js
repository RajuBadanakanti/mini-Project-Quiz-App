import {withRouter} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const GameResults = props => {
  const gameResultPassingData = props

  const {location} = gameResultPassingData
  const {state} = location
  const data = state
  const {correctAnsCount, totalQCount} = data

  const winCondition = correctAnsCount > totalQCount / 2
  const persentage = (correctAnsCount / totalQCount) * 100

  const onClickReportBtn = () => {
    const reportData = data
    const {history} = props
    history.replace('/game-report', reportData)
  }

  const renderGameResultSuccessView = (percentage, ansCount) => (
    <div className="game-result-success-container">
      <div className="game-result-success-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
          alt="congrats"
          className="game-result-success-trophy"
        />
        <h1 className="game-result-success-header">Congrats!</h1>
        <h1 className="game-result-success-result-header">
          {percentage}% Correctly Answered
        </h1>
        <p className="quiz-result-status-para">Quiz completed successfully.</p>
        <p className="quiz-result-attempted-para">
          You attempted {ansCount} out of {totalQCount} questions as correct.
        </p>
        <button
          type="button"
          className="game-result-report-button"
          onClick={onClickReportBtn}
        >
          Report
        </button>
      </div>
    </div>
  )

  const renderGameResultFailureView = (percentage, ansCount) => (
    <div className="game-result-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
        alt="lose"
        className="game-result-failure-img"
      />
      <h1 className="game-result-failure-header">You Lose!</h1>
      <h1 className="game-result-failure-result-header">
        {percentage}% Correctly Answered
      </h1>
      <p className="quiz-result-failure-attempted-para">
        You attempted {ansCount} out of {totalQCount} questions as correct.
      </p>
      <button
        type="button"
        className="game-result-report-button"
        onClick={onClickReportBtn}
      >
        Report
      </button>
    </div>
  )

  return (
    <>
      <Header />
      <div className="bg-game-results-container">
        <div className="game-results-white-container">
          {winCondition
            ? renderGameResultSuccessView(
                persentage,
                correctAnsCount,
                totalQCount,
              )
            : renderGameResultFailureView(
                persentage,
                correctAnsCount,
                totalQCount,
              )}
        </div>
      </div>
    </>
  )
}

export default withRouter(GameResults)
