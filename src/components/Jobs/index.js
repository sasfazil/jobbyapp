import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import EmployType from '../EmployType'
import SalaryRange from '../SalaryRange'
import Jobscard from '../JobsCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const commonStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  notFound: 'NOT_FOUND',
}

class Jobs extends Component {
  state = {
    userDetails: {},
    userProfileStatus: commonStatus.initial,

    employmentType: [],
    minimumPackage: '',
    jobSearchText: '',

    jobDetailsStatus: commonStatus.initial,
    jobDetails: [],
  }

  componentDidMount() {
    this.getUserDetails()
    this.getJobDetails()
  }

  onSearchJobsValue = event => {
    this.setState({jobSearchText: event.target.value})
  }

  onEnterJobSearch = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  onSearchJobs = () => {
    this.getJobDetails()
  }

  radioClick = value => {
    this.setState({minimumPackage: value}, this.getJobDetails)
  }

  checkBoxClick = (stats, value) => {
    const {employmentType} = this.state
    if (stats) {
      const updatedEmployType = employmentType
      updatedEmployType.push(value)
      this.setState({employmentType: updatedEmployType}, this.getJobDetails)
    } else {
      const updatedEmployType = employmentType.filter(each => each !== value)
      this.setState({employmentType: updatedEmployType}, this.getJobDetails)
    }
  }

  getUserDetails = async () => {
    this.setState({userProfileStatus: commonStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userProfileStatus: commonStatus.success,
        userDetails: profileDetails,
      })
    } else {
      this.setState({userProfileStatus: commonStatus.failure})
    }
  }

  getJobDetails = async () => {
    this.setState({jobDetailsStatus: commonStatus.inProgress})
    const {minimumPackage, employmentType, jobSearchText} = this.state
    const employeeType = employmentType.join()
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType}&minimum_package=${minimumPackage}&search=${jobSearchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const jobsArray = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      if (jobsArray.length > 0) {
        this.setState({
          jobDetailsStatus: commonStatus.success,
          jobDetails: jobsArray,
        })
      } else {
        this.setState({
          jobDetailsStatus: commonStatus.notFound,
        })
      }
    } else {
      this.setState({jobDetailsStatus: commonStatus.failure})
    }
  }

  userProfileInProgress = () => (
    <div className='loading-container-style'>
      <div className='loader-container' data-testid='loader'>
        <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
      </div>
    </div>
  )

  userProfileFailure = () => (
    <div className='retry-btn-container'>
      <button className='retry-btn' type='button' onClick={this.getUserDetails}>
        Retry
      </button>
    </div>
  )

  userProfileSuccess = () => {
    const {userDetails} = this.state
    const {name, shortBio, profileImageUrl} = userDetails
    return (
      <div className='user-profile-container'>
        <div>
          <img src={profileImageUrl} alt='profile' className='user-profile' />
        </div>
        <h1 className='user-profile-name'>{name}</h1>
        <p className='user-profile-bio'>{shortBio}</p>
      </div>
    )
  }

  aboutUserProfileStatus = () => {
    const {userProfileStatus} = this.state
    switch (userProfileStatus) {
      case commonStatus.success:
        return this.userProfileSuccess()
      case commonStatus.failure:
        return this.userProfileFailure()
      case commonStatus.inProgress:
        return this.userProfileInProgress()
      default:
        return null
    }
  }

  employTypeContainer = () => (
    <div className='employement-type-container'>
      <h1 className='employ-type-heading'>Type of Employement</h1>
      <ul className='employ-type-list-container'>
        {employmentTypesList.map(each => (
          <EmployType
            key={each.employmentTypeId}
            employTypeData={each}
            checkBoxClick={this.checkBoxClick}
          />
        ))}
      </ul>
    </div>
  )

  salaryRangeContainer = () => (
    <div className='salary-range-container'>
      <h1 className='salary-range-heading'>Salary Range</h1>
      <ul className='salary-range-list-container'>
        {salaryRangesList.map(each => (
          <SalaryRange
            key={each.salaryRangeId}
            salaryRangeData={each}
            radioClick={this.radioClick}
          />
        ))}
      </ul>
    </div>
  )

  jobDetailsSuccess = () => {
    const {jobDetails} = this.state
    return (
      <ul className='success-job-container'>
        {jobDetails.map(each => (
          <Jobscard key={each.id} jobDetailItems={each} />
        ))}
      </ul>
    )
  }

  jobDetailsFailure = () => (
    <div className='job-failure-container'>
      <div>
        <img
          src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
          alt='failure view'
          className='job-failure-img'
        />
      </div>
      <h1 className='job-failure-heading'>Oops! Something Went Wrong</h1>
      <p className='job-failure-para'>
        We cannot seem to find the page you are looking for
      </p>
      <button
        type='button'
        className='job-failure-retry-btn'
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  jobDetailsInProgress = () => (
    <div className='loading-container-style'>
      <div className='loader-container' data-testid='loader'>
        <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
      </div>
    </div>
  )

  jobDetailsNotFound = () => (
    <div className='no-jobs-container'>
      <div>
        <img
          src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
          alt='no jobs'
          className='no-jobs-img'
        />
      </div>
      <h1 className='no-job-heading'>No Jobs Found</h1>
      <p className='no-job-para'>
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  aboutJobDetails = () => {
    const {jobDetailsStatus} = this.state
    switch (jobDetailsStatus) {
      case commonStatus.success:
        return this.jobDetailsSuccess()
      case commonStatus.failure:
        return this.jobDetailsFailure()
      case commonStatus.inProgress:
        return this.jobDetailsInProgress()
      case commonStatus.notFound:
        return this.jobDetailsNotFound()
      default:
        return null
    }
  }

  render() {
    const {jobSearchText} = this.state
    return (
      <>
        <Header />
        <div className='jobs-main-container'>
          <div className='sm-search-input-container'>
            <input
              type='search'
              className='search-input-el'
              placeholder='search'
              value={jobSearchText}
              onChange={this.onSearchJobsValue}
              onKeyDown={this.onEnterJobSearch}
            />
            <button
              type='button'
              data-testid='searchButton'
              className='search-input-btn'
              onClick={this.onSearchJobs}
            >
              <BsSearch className='search-icon' />
              {/* */}
            </button>
          </div>
          <div className='user-details-filter-container'>
            {this.aboutUserProfileStatus()}
            {this.employTypeContainer()}
            {this.salaryRangeContainer()}
          </div>
          <div className='job-details-search-container'>
            <div className='lg-search-input-container'>
              <input
                type='search'
                className='search-input-el'
                placeholder='search'
                value={jobSearchText}
                onChange={this.onSearchJobsValue}
                onKeyDown={this.onEnterJobSearch}
              />
              <button
                type='button'
                data-testid='searchButton'
                className='search-input-btn'
                onClick={this.onSearchJobs}
              >
                <BsSearch className='search-icon' />
                {/* */}
              </button>
            </div>
            {this.aboutJobDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
