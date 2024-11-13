import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

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
    choosedOptionId: '',
    correctAnsCount: 0,
    isOptionDisable: false,
    isNextBtnDesable: true,
    unAttemtedList: [],
  }

  componentDidMount() {
    this.getQuizQuestionsData()

    this.timer = setInterval(() => {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }, 1000)
  }

  // onClicked Option ////////////////////
  onClickedOption = (value, imgValue) => {
    const {questionNo, quizQuestionsList, correctAnsCount} = this.state

    const questionsObj = quizQuestionsList[questionNo - 1]
    const {options, optionsType} = questionsObj

    if (optionsType === 'IMAGE') {
      const finding = options.find(each => each.id === imgValue)

      if (finding.isCorrect === 'true') {
        this.setState({
          correctAnsCount: correctAnsCount + 1,
        })
      }

      this.setState({
        choosedOptionId: imgValue,
        isOptionDisable: true,
        isNextBtnDesable: false,
      })
    } else {
      const finding = options.find(each => each.id === value)

      if (finding.isCorrect === 'true') {
        this.setState({correctAnsCount: correctAnsCount + 1})
      }

      this.setState({
        choosedOptionId: value,
        isOptionDisable: true,
        isNextBtnDesable: false,
      })
    }
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
          isCorrect: eachOption.is_correct,
          imageUrl: eachOption.image_url,
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

  // Next Button  >>>>>>>>>
  onClickNextButton = () => {
    const {history} = this.props

    const {questionNo, quizQuestionsList, correctAnsCount} = this.state
    const {unAttemtedList} = this.state

    this.setState({
      seconds: 15,
      questionNo: questionNo + 1,
      isOptionDisable: false,
      isNextBtnDesable: true,
    })

    // Passing the Data To gameResult Component
    const data = {
      totalQCount: quizQuestionsList.length,
      correctAnsCount,
      unAttemtedList,
    }

    if (quizQuestionsList.length === questionNo) {
      history.replace('/game-results', data)
    }
  }

  // SUCCESS VIEW ***********************
  renderSuccessView = () => {
    const {quizQuestionsList, seconds, questionNo} = this.state
    const {choosedOptionId, isOptionDisable, isNextBtnDesable} = this.state
    const totalQuestions = quizQuestionsList.length
    const questionsObj = quizQuestionsList[questionNo - 1]
    const {questionText} = questionsObj
    //  const {questionText, optionsType, options} = questionsObj  console.log(questionsObj)

    const nextBtnStatus = isNextBtnDesable
      ? 'next-question-button'
      : 'next-question-button-enable '

    /*  const nextBtnType =
      quizQuestionsList.length === questionNo ? 'submit' : 'button' */

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
          <QuizGameOpts
            questionsOptionsData={questionsObj}
            onClickedOption={this.onClickedOption}
            choosedOptionId={choosedOptionId}
            isOptionDisable={isOptionDisable}
          />
        </div>
        <button
          type="button"
          disabled={isNextBtnDesable}
          className={`${nextBtnStatus} next-question-button`}
          onClick={this.onClickNextButton}
        >
          Next Question
        </button>
      </div>
    )
  }

  // FAILURE VIEW ***********************************
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

  // LOADING VIEW ***********************************
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

  // time Limit ///////////////////////
  timeLimitIsOver = () => {
    const {quizQuestionsList, questionNo, correctAnsCount} = this.state
    const {unAttemtedList} = this.state
    const questionsObj = quizQuestionsList[questionNo - 1]

    const data = {
      correctAnsCount,
      totalQCount: quizQuestionsList.length,
      unAttemtedList,
    }

    this.setState(prevState => ({
      seconds: 15,
      questionNo: questionNo + 1,
      isOptionDisable: false,
      unAttemtedList: [...prevState.unAttemtedList, questionsObj],
    }))

    // How NAVIGATE AND PASSING THE DATA TO GAMERESULT COMPONENT ??????????????? //

    const {history} = this.props
    if (quizQuestionsList.length === questionNo) {
      history.replace('/game-results', data)
    }
  }

  render() {
    const {seconds} = this.state

    //  MOVE NEXT QUESTION WHEN TIMER IS SHOWN 0 //
    if (seconds === 0) {
      this.timeLimitIsOver()
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

export default withRouter(QuizGame)
