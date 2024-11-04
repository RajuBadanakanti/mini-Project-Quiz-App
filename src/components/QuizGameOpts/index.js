import {Component} from 'react'
import './index.css'

const correctCheckedCircle =
  'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'

const incorrectCloseCircle =
  'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'

class QuizGameOptions extends Component {
  state = {
    choosedOptionId: '',
  }

  // on Click Options >>>>>>>>>>>>>>>>>>>>>
  onClickOption = event => {
    this.setState({
      choosedOptionId: event.target.value,
    })
  }

  // DEFAULT VIEW >>>>
  renderDEFAULToptionsView = () => {
    const {choosedOptionId} = this.state
    const {questionsOptionsData} = this.props
    const {options} = questionsOptionsData
    // id,text,isCorrect = options
    return (
      <ol className="quiz-options-default-list-container">
        {options.map(eachItem => {
          let selcetOptionDiv = ''
          let selectedOptionBtn = ''
          let ansImg = ''

          if (
            eachItem.id === choosedOptionId &&
            eachItem.isCorrect === 'true'
          ) {
            selcetOptionDiv = 'quiz-options-default-true-div'
            selectedOptionBtn = 'quiz-options-default-true-button'
            ansImg = (
              <img
                className="default-selcet-option-img"
                src={correctCheckedCircle}
                alt="correct checked circle"
              />
            )
          } else if (
            eachItem.id === choosedOptionId &&
            eachItem.isCorrect === 'false'
          ) {
            selcetOptionDiv = 'quiz-options-default-false-div'
            selectedOptionBtn = 'quiz-options-default-false-button'
            ansImg = (
              <img
                className="default-selcet-option-img"
                src={incorrectCloseCircle}
                alt="incorrect close circle"
              />
            )
          }

          return (
            <div className="default-options-container">
              <div className={`${selcetOptionDiv} quiz-options-default-div`}>
                <li
                  key={eachItem.id}
                  className="quiz-options-list-item-default-container"
                >
                  <button
                    type="button"
                    className={`${selectedOptionBtn} quiz-options-default-button`}
                    value={eachItem.id}
                    onClick={this.onClickOption}
                  >
                    {eachItem.text}
                  </button>
                </li>
              </div>
              {ansImg}
            </div>
          )
        })}
      </ol>
    )
  }

  // IMAGE VIEW >>>>
  renderIMAGEoptionsView = () => {
    const {choosedOptionId} = this.state
    const {questionsOptionsData} = this.props
    const {options} = questionsOptionsData
    console.log(options)
    // id,text,isCorrect,imageUrl = options,

    return (
      <ol className="quiz-options-image-list-container ">
        {options.map(eachItem => {
          let ansImg = ''
          if (
            eachItem.id === choosedOptionId &&
            eachItem.isCorrect === 'true'
          ) {
            ansImg = (
              <img
                src={correctCheckedCircle}
                alt="correct checked circle"
                className="image-ans-option-img"
              />
            )
          } else if (
            eachItem.id === choosedOptionId &&
            eachItem.isCorrect === 'false'
          ) {
            ansImg = (
              <img
                src={incorrectCloseCircle}
                alt="incorrect close circle"
                className="image-ans-option-img"
              />
            )
          }

          return (
            <li
              key={eachItem.text}
              className="quiz-options-image-list-item-container"
            >
              <button
                type="button"
                className="image-options-button"
                value={eachItem.id}
                onClick={this.onClickOption}
              >
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.text}
                  className="quiz-option-images"
                />
              </button>
              {ansImg}
            </li>
          )
        })}
      </ol>
    )
  }

  // SINGLE SELECT >>>>>

  renderSINGLESELECToptionsView = () => {
    const {choosedOptionId} = this.state
    const {questionsOptionsData} = this.props
    const {options} = questionsOptionsData
    // id,text,isCorrect = options
    return (
      <ol className="quiz-options-single-selcet-list-container">
        {options.map(eachItem => {
          let ansImg = ''
          if (
            eachItem.id === choosedOptionId &&
            eachItem.isCorrect === 'true'
          ) {
            ansImg = (
              <img
                src={correctCheckedCircle}
                className="select-options-ans-img"
                alt="correct checked circle"
              />
            )
          } else if (
            eachItem.id === choosedOptionId &&
            eachItem.isCorrect === 'false'
          ) {
            ansImg = (
              <img
                src={incorrectCloseCircle}
                className="select-options-ans-img"
                alt="incorrect close circle"
              />
            )
          }

          return (
            <li className="quiz-options-single-selcet-list-item-container">
              <input
                type="radio"
                id={eachItem.id}
                className="single-select-input"
                value={eachItem.id}
                name="select"
                onClick={this.onClickOption}
              />
              <label htmlFor={eachItem.id} className="single-selcet-label">
                {eachItem.text}
              </label>
              {ansImg}
            </li>
          )
        })}
      </ol>
    )
  }

  renderAllTypeOfOptions = () => {
    const {questionsOptionsData} = this.props
    const {optionsType} = questionsOptionsData

    switch (optionsType) {
      case 'DEFAULT':
        return this.renderDEFAULToptionsView()

      case 'IMAGE':
        return this.renderIMAGEoptionsView()
      case 'SINGLE_SELECT':
        return this.renderSINGLESELECToptionsView()
      default:
        return ''
    }
  }

  render() {
    return <>{this.renderAllTypeOfOptions()}</>
  }
}

export default QuizGameOptions

/*
          let ansImg = ''
          if (
            eachItem.id === choosedOptionId &&
            eachItem.isCorrect === 'true'
          ) {
            ansImg = (
              <img
                src={correctCheckedCircle}
                alt="correct checked circle"
                className="image-ans-option-img"
              />
            )
          } else if (
            eachItem.id === choosedOptionId &&
            eachItem.isCorrect === 'false'
          ) {
            ansImg = (
              <img
                src={incorrectCloseCircle}
                alt="incorrect close circle"
                className="image-ans-option-img"
              />
            )
          }

*/
