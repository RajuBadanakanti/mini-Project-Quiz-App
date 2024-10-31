import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

// Geting URL from Cloudnary
const nxtQuizLogo =
  'https://res.cloudinary.com/dnh9hnjbx/image/upload/e_improve/v1729745398/Frame_8787_wzuirg.png'

class Login extends Component {
  state = {
    isShown: false,
    username: '',
    password: '',
    errorMsg: '',
    isShownErrMsg: false,
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({isShown: !prevState.isShown}))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  // FORM SUBMITION
  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({isShownErrMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiLoginURL = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiLoginURL, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {isShown, username, password, isShownErrMsg, errorMsg} = this.state
    const passwordType = isShown ? 'text' : 'password'
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="bg-login-container">
        <div className="login-white-container">
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <img
              src={nxtQuizLogo}
              className="nxt-quix-logo"
              alt="website logo"
            />

            <div className="label-input-container">
              <label htmlFor="username" className="label-text">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="input-element-username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="password" className="label-text">
                PASSWORD
              </label>
              <input
                id="password"
                type={passwordType}
                value={password}
                onChange={this.onChangePassword}
                className="input-element-password"
              />
            </div>
            <div className="show-password-checkbox">
              <input
                id="checkbox"
                type="checkbox"
                className="checkbox-input"
                onClick={this.onClickCheckbox}
              />
              <label htmlFor="checkbox" className="show-password-text">
                Show Password
              </label>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isShownErrMsg && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
