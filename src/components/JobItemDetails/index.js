import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiOutlineExternalLink} from 'react-icons/hi'
import {IoLocationSharp} from 'react-icons/io5'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import './index.css'

const commonStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {
    jobStatus: commonStatus.initial,
    firstSectionObject: {},
    similarJobsArray: [],
  }

  componentDidMount() {
    this.checkJobDetails()
  }

  checkJobDetails = async () => {
    this.setState({jobStatus: commonStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      const firstSectionObject = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        title: jobDetails.title,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }
      const similarJobsArray = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobStatus: commonStatus.success,
        firstSectionObject,
        similarJobsArray,
      })
    } else {
      this.setState({jobStatus: commonStatus.failure})
    }
  }

  jobItemFirstSection = () => {
    const {firstSectionObject} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      title,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = firstSectionObject
    return (
      <>
        <div className="success-job-detail-first-section">
          <img
            alt="job details company logo"
            src={companyLogoUrl}
            className="success-job-detail-companyLogo"
          />
          <div className="success-job-detail-role-container">
            <h1 className="success-job-detail-role-title">{title}</h1>
            <div className="success-job-detail-role-rating-container">
              <AiFillStar className="success-job-detail-star" />
              <p className="success-job-detail-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="success-job-detail-second-section">
          <div className="success-job-detail-location-container">
            <IoLocationSharp className="success-job-detail-common-logo" />
            <p className="success-job-detail-location">{location}</p>
            <BsBriefcaseFill className="success-job-detail-common-logo" />
            <p className="success-job-detail-employment-type">
              {employmentType}
            </p>
          </div>
          <p className="success-job-detail-package-per-annum">
            {packagePerAnnum}
          </p>
        </div>
        <div className="heading-with-link-container">
          <h1 className="success-job-detail-heading">Description</h1>
          <a
            className="external-company-link"
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
          >
            <p>Visit</p>
            <HiOutlineExternalLink />
          </a>
        </div>
        <p className="success-job-detail-description">{jobDescription}</p>
        <h1 className="success-job-detail-heading">Skills</h1>
        <ul className="success-job-detail-skill-list-container">
          {skills.map(each => (
            <li className="success-job-detail-skill-list-items" key={each.name}>
              <img
                className="skills-imgs"
                src={each.imageUrl}
                alt={each.name}
              />
              <p className="skills-name">{each.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="success-job-detail-heading">Life at Company</h1>
        <div className="success-job-detail-container">
          <p className="success-job-detail-description">
            {lifeAtCompany.description}
          </p>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="success-job-detail-at-company-img"
          />
        </div>
      </>
    )
  }

  similarJobItems = each => {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = each

    return (
      <>
        <div className="job-success-similar-first-section">
          <img
            src={companyLogoUrl}
            className="job-success-similar-companyLogo"
            alt="similar job company logo"
          />
          <div className="job-success-similar-role-container">
            <h1 className="job-success-similar-role-title">{title}</h1>
            <div className="job-success-similar-role-rating-container">
              <AiFillStar className="job-success-similar-star" />
              <p className="job-success-similar-rating">{rating}</p>
            </div>
          </div>
        </div>

        <h1 className="job-success-similar-heading">Description</h1>
        <p className="job-success-similar-description">{jobDescription}</p>
        <div className="job-success-similar-second-section">
          <div className="job-success-similar-location-container">
            <IoLocationSharp className="job-success-similar-common-logo" />
            <p className="job-success-similar-location">{location}</p>
            <BsBriefcaseFill className="job-success-similar-common-logo" />
            <p className="job-success-similar-employment-type">
              {employmentType}
            </p>
          </div>
        </div>
      </>
    )
  }

  jobDetailsSuccess = () => {
    const {similarJobsArray} = this.state
    return (
      <div className="job-success-container">
        <div className="job-success-first-container">
          {this.jobItemFirstSection()}
        </div>
        <div className="job-success-second-container">
          <h1 className="job-success-similar-main-heading">Similar Jobs</h1>
          <ul className="job-success-similar-container-list">
            {similarJobsArray.map(each => (
              <li key={each.id} className="job-success-similar-list-item">
                {this.similarJobItems(each)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  jobItemFailure = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-img"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-failure-retry-btn"
        onClick={this.checkJobDetails}
      >
        Retry
      </button>
    </div>
  )

  jobItemInProgress = () => (
    <div className="loading-container-style">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  aboutJobDetailsContainer = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case commonStatus.inProgress:
        return this.jobItemInProgress()
      case commonStatus.failure:
        return this.jobItemFailure()
      case commonStatus.success:
        return this.jobDetailsSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="about-job-details-container">
          {this.aboutJobDetailsContainer()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
