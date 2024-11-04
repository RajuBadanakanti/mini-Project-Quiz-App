/* import './index.css'

const QuizGameOptions = props => {
  const {optionsType, optionDetails} = props
  const {id, text} = optionDetails

  const onClickOption = () => {
    console.log(id, 'clicked')
  }

  // I'M STRUCK HERE >>>>>>>>>>>>>>>>>>>>>>>>
  // HOW TO BUILD IMAGE TYPE OF OPTIONS  ????

  const renderOnOptionType = () => {
    if (optionsType === 'IMAGE') {
      return (
        <li className="image" onClick={onClickOption}>
          <p>{text}</p>
        </li>
      )
    }
    if (optionsType === 'SINGLE_SELECT') {
      return (
        <li
          className="single-select-options-item-container"
          onClick={onClickOption}
        >
          <input type="radio" id={id} className="single-select-input" />
          <label htmlFor={id}>{text}</label>
        </li>
      )
    }

    return (
      <div className="default-options-item-container">
        <li key={id} onClick={onClickOption}>
          <p className="quiz-options-button-text">{text}</p>
        </li>
      </div>
    )
  }

  return <> {renderOnOptionType()} </>
}

export default QuizGameOptions

/* return (
    <li key={id} className="quiz-options-item-container">
      <p className="quiz-options-text">{text}</p>
    </li>
  ) */
