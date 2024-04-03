import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrMsg: false}

  onSuccessReq = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
    this.setState({showErrMsg: false})
  }

  onFailureReq = errorMsg => {
    this.setState({showErrMsg: true, errorMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessReq(data.jwt_token)
    } else {
      this.onFailureReq(data.error_msg)
    }
  }

  onUsernameUpdate = event => {
    this.setState({username: event.target.value})
  }

  onPasswordUpdate = event => {
    this.setState({password: event.target.value})
  }

  renderUserNameForm = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label className="login-username-label" htmlFor="userName">
          USERNAME
        </label>
        <input
          type="text"
          className="login-username-input"
          placeholder="Username"
          value={username}
          id="userName"
          onChange={this.onUsernameUpdate}
        />
      </div>
    )
  }

  renderPasswordForm = () => {
    const {password} = this.state
    return (
      <div className="password-container">
        <label className="login-password-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="login-password-input"
          placeholder="Password"
          id="password"
          value={password}
          onChange={this.onPasswordUpdate}
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {errorMsg, showErrMsg} = this.state
    return (
      <div className="main-login-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-img"
          />
          <form className="login-form" onSubmit={this.onFormSubmit}>
            {this.renderUserNameForm()}
            {this.renderPasswordForm()}
            <button type="submit" className="login-form-submit">
              Login
            </button>
            {showErrMsg && <p className="err-para">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
