import {IoLocationSharp} from 'react-icons/io5'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobsCard = props => {
  const {jobDetailItems} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = jobDetailItems

  const jobListItems = () => (
    <>
      <div className="success-job-first-section">
        <img
          src={companyLogoUrl}
          className="success-job-companyLogo"
          alt="company logo"
        />
        <div className="success-job-role-container">
          <h1 className="success-job-role-title">{title}</h1>
          <div className="success-job-role-rating-container">
            <AiFillStar className="success-job-star" />
            <p className="success-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="success-job-second-section">
        <div className="success-job-location-container">
          <IoLocationSharp className="success-job-common-logo" />
          <p className="success-job-location">{location}</p>
          <BsBriefcaseFill className="success-job-common-logo" />
          <p className="success-job-employment-type">{employmentType}</p>
        </div>
        <p className="success-job-package-per-annum">{packagePerAnnum}</p>
      </div>
      <h1 className="success-job-heading">Description</h1>
      <p className="success-job-description">{jobDescription}</p>
    </>
  )

  return (
    <li className="success-job-list-item">
      <Link className="jobs-link-el" to={`/jobs/${id}`}>
        {jobListItems()}
      </Link>
    </li>
  )
}

export default JobsCard
