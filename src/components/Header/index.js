import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const toLogin = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <div className="mobile-view-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="mobile-view-logo"
          />
        </Link>
        <ul className="mobile-view-list-container">
          <Link to="/">
            <li className="mobile-view-list-items">
              <AiFillHome className="react-icons" />
              {/* */}
            </li>
          </Link>
          <Link to="/jobs">
            <li className="mobile-view-list-items">
              <BsBriefcaseFill className="react-icons" />
              {/* */}
            </li>
          </Link>
          <li className="mobile-view-list-items ">
            <button
              type="button"
              className="mobile-logout-btn"
              onClick={toLogin}
            >
              <FiLogOut className="react-icons" />
              {/* */}
            </button>
          </li>
        </ul>
      </div>
      <div className="lg-view-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="lg-view-logo"
          />
        </Link>
        <ul className="lg-view-list-container">
          <Link to="/" className="lg-view-link-el">
            <li className="lg-view-list-item">Home</li>
          </Link>
          <Link to="/jobs" className="lg-view-link-el">
            <li className="lg-view-list-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={toLogin}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
