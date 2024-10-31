import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import QuizGameOptions from '../QuizGameOptions'
import './index.css'

const quizGameStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class QuizGame extends Component {
  state = {
    quizQuestionsList: [],
    apiQuizStatus: quizGameStatusConstants.initial,
    seconds: 15,
    questionNo: 1,
  }

  componentDidMount() {
    this.getQuizQuestionsData()
    // timer >>>>>>>>
    this.timer = setInterval(() => {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }, 1000)
  }

  getQuizQuestionsData = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({apiQuizStatus: quizGameStatusConstants.inProgress})

    const apiQuizGameURL = 'https://apis.ccbp.in/assess/questions'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiQuizGameURL, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const updatedData = data.questions.map(eachItem => ({
        id: eachItem.id,
        optionsType: eachItem.options_type,
        questionText: eachItem.question_text,
        options: eachItem.options.map(eachOpt => ({
          id: eachOpt.id,
          isCorrect: eachOpt.is_correct,
          text: eachOpt.text,
        })),
      }))

      console.log(updatedData)

      this.setState({
        quizQuestionsList: updatedData,
        apiQuizStatus: quizGameStatusConstants.success,
      })
    } else {
      this.setState({apiQuizStatus: quizGameStatusConstants.failure})
    }
  }

  // SUCCESS VIEW >>>>>>>>>

  renderSuccessView = () => {
    const {quizQuestionsList, seconds, questionNo} = this.state
    const totalQuestions = quizQuestionsList.length
    const questionsObj = quizQuestionsList[questionNo - 1]
    const {questionText, optionsType, options} = questionsObj
    // console.log(questionsObj)

    return (
      <div className="quiz-content-container">
        <div className="quiz-questions-timer-container">
          <div className="quiz-questions-counter-card">
            <p className="questions-text">Question</p>
            <p className="question-count">
              {questionNo}/{totalQuestions}
            </p>
          </div>
          <div className="timer-card-container">
            <p className="timer-seconds">{seconds}</p>
          </div>
        </div>
        <div className="quiz-questions-container">
          <h1 className="quiz-question">{questionText}</h1>
          <ol className="quiz-options-list-container">
            {options.map(eachOpt => (
              <QuizGameOptions
                key={eachOpt.id}
                optionsType={optionsType}
                optionDetails={eachOpt}
              />
            ))}
          </ol>
        </div>
        <button disabled="true" type="button" className="next-question-button">
          Next Question
        </button>
      </div>
    )
  }

  // FAILURE VIEW >>>>>>>>>>
  renderFailureView = () => (
    <div>
      <h1>FAILURE</h1>
    </div>
  )

  // LOADING VIEW >>>>>>>>>>
  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  // ALL VIEWS
  renderAllViews = () => {
    const {apiQuizStatus} = this.state
    switch (apiQuizStatus) {
      case quizGameStatusConstants.success:
        return this.renderSuccessView()
      case quizGameStatusConstants.failure:
        return this.renderFailureView()
      case quizGameStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return ''
    }
  }

  /* my default Data
  stopTimer = () => {
    const {quizQuestionsList, questionNo} = this.state

    if (questionNo < quizQuestionsList.length) {
      this.setState(prevState => ({
        questionNo: prevState.questionNo + 1,
        seconds: 15,
      }))
    }
  }
   */

  render() {
    const {seconds} = this.state

    if (seconds === 0) {
      clearInterval(this.timer)
    }

    return (
      <>
        <Header />
        <div className="bg-quiz-game-container">
          <div className="quiz-game-white-container">
            {this.renderAllViews()}
          </div>
          <button type="button" onClick={this.stopTimer}>
            stop
          </button>
        </div>
      </>
    )
  }
}

export default QuizGame

/* ... */
