import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const nxtQuizLogo =
  'https://res.cloudinary.com/dnh9hnjbx/image/upload/e_improve/v1729745398/Frame_8787_wzuirg.png'

const Header = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="bg-header-container">
      <Link to="/">
        <img
          src={nxtQuizLogo}
          alt="website logo"
          className="header-webiste-img"
        />
      </Link>
      <button
        type="button"
        className="logout-button"
        onClick={onClickLogoutButton}
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
