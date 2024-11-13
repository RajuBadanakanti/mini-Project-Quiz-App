import './index.css'

const correctCheckedCircle =
  'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'

const incorrectCloseCircle =
  'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'

const QuizGameOptions = props => {
  const {
    questionsOptionsData,
    choosedOptionId,
    onClickedOption,
    isOptionDisable,
  } = props
  const {optionsType, options} = questionsOptionsData

  //  console.log(choosedOptionId)
  // id,text,isCorrect = options

  // on Click Options >>>>>>>>>>>>>>>>>>>>>
  const onClickOption = event => {
    const imgOptionId = event.target.dataset.id
    const optionsIds = event.target.value
    onClickedOption(optionsIds, imgOptionId)
  }

  // DEFAULT VIEW >>>>
  const renderDEFAULToptionsView = () => (
    // id,text,isCorrect = options
    <ol className="quiz-options-default-list-container">
      {options.map(eachItem => {
        let selcetOptionDiv = ''
        let selectedOptionBtn = ''
        let ansImg = ''

        if (eachItem.id === choosedOptionId && eachItem.isCorrect === 'true') {
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
                  onClick={onClickOption}
                  disabled={isOptionDisable}
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

  // IMAGE VIEW >>>>
  const renderIMAGEoptionsView = () => (
    // console.log(options)
    // id,text,isCorrect,imageUrl = options,

    <ol className="quiz-options-image-list-container ">
      {options.map(eachItem => {
        let ansImg = ''
        if (eachItem.id === choosedOptionId && eachItem.isCorrect === 'true') {
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
            key={eachItem.id}
            className="quiz-options-image-list-item-container"
          >
            <button
              type="button"
              className="image-options-button"
              disabled={isOptionDisable}
            >
              <img
                src={eachItem.imageUrl}
                alt={eachItem.text}
                data-id={eachItem.id}
                onClick={onClickOption}
                className="quiz-option-images"
              />
              ..
            </button>

            {ansImg}
          </li>
        )
      })}
    </ol>
  )

  // SINGLE SELECT >>>>>

  const renderSINGLESELECToptionsView = () => (
    // id,text,isCorrect = options
    <ol className="quiz-options-single-selcet-list-container">
      {options.map(eachItem => {
        let ansImg = ''
        if (eachItem.id === choosedOptionId && eachItem.isCorrect === 'true') {
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
              onClick={onClickOption}
              disabled={isOptionDisable}
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

  const renderAllTypeOfOptions = () => {
    switch (optionsType) {
      case 'DEFAULT':
        return renderDEFAULToptionsView()

      case 'IMAGE':
        return renderIMAGEoptionsView()
      case 'SINGLE_SELECT':
        return renderSINGLESELECToptionsView()
      default:
        return ''
    }
  }

  return <>{renderAllTypeOfOptions()}</>
}

export default QuizGameOptions
