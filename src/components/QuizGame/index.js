import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
// useless File import QuizGameOptions from '../QuizGameOptions'
import QuizGameOpts from '../QuizGameOpts'
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
    this.timer = setInterval(() => {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }, 1000)
  }

  updateOptionsByType = (options, optionsType) => {
    switch (optionsType) {
      case 'DEFAULT':
        return options.map(eachOption => ({
          id: eachOption.id,
          text: eachOption.text,
          isCorrect: eachOption.is_correct,
        }))
      case 'IMAGE':
        return options.map(eachOption => ({
          id: eachOption.id,
          text: eachOption.text,
          imageUrl: eachOption.image_url,
          isCorrect: eachOption.is_correct,
        }))
      case 'SINGLE_SELECT':
        return options.map(eachOption => ({
          id: eachOption.id,
          text: eachOption.text,
          isCorrect: eachOption.is_correct,
        }))
      default:
        return options
    }
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
        options: this.updateOptionsByType(
          eachItem.options,
          eachItem.options_type,
        ),
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
    const {questionText} = questionsObj
    //  const {questionText, optionsType, options} = questionsObj  console.log(questionsObj)

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
          <QuizGameOpts questionsOptionsData={questionsObj} />
        </div>
        <button
          disabled="true"
          type="button"
          className="next-question-button"
          onClick={this.onClickBtn}
        >
          Next Question
        </button>
      </div>
    )
  }

  // FAILURE VIEW >>>>>>>>>>
  renderFailureView = () => (
    <div className="quiz-game-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure view"
        className="quiz-game-failure-img"
      />
      <h1 className="quiz-game-failure-heading">Something went wrong</h1>
      <p className="quiz-game-failure-description">
        Our server are busy please try again
      </p>
      <button type="button" className="quiz-game-failure-retry-button">
        Retry
      </button>
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

  timeLimitIsOver = () => {
    //  HOW TO MOVE NEXT QUESTION WHEN TIMER IS SHOWN 0  //
    //  **************************************************************************************** //
  }

  render() {
    const {seconds} = this.state
    if (seconds === 0) {
      this.timeLimitIsOver()
      clearInterval(this.timer)
      //  HOW TO MOVE NEXT QUESTION WHEN TIMER IS SHOWN 0  //
      //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  //
    }

    return (
      <>
        <Header />
        <div className="bg-quiz-game-container">
          <div className="quiz-game-white-container">
            {this.renderAllViews()}
          </div>
        </div>
      </>
    )
  }
}

export default QuizGame
