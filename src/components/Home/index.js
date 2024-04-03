import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

const Home = () => {
  const JwtToken = Cookies.get('jwt_token')

  if (JwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="in-home-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <div>
            <Link to="/jobs">
              <button type="button" className="home-btn">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
