import {withRouter} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const GameReport = props => {
  const reportData = props
  const {location} = reportData
  const {state} = location
  const data = state
  const {correctAnsCount, totalQCount} = data
  console.log(data)

  return (
    <>
      <Header />
      <div className="bg-game-report-container">
        <div className="game-report-white-container">
          <div className="game-score-report-container">
            <div className="score-container">
              <p className="game-report-score">
                <span className="game-report-score-span">
                  {correctAnsCount}
                </span>
                <span className="game-report-score-span-by">/</span>
                {totalQCount}
              </p>
            </div>
            <div className="score-results-container">
              <div className="score-results-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct answer icon"
                  className="score-status-icons"
                />
                <p>Correct answers</p>
              </div>
              <div className="score-results-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt="incorrect answer icon"
                  className="score-status-icons"
                />
                <p>Wrong answers</p>
              </div>
              <div className="score-results-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted icon"
                  className="score-status-icons"
                />
                <p>Unattempted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(GameReport)
