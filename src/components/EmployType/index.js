import './index.css'

const EmployType = props => {
  const {employTypeData, checkBoxClick} = props
  const {employmentTypeId, label} = employTypeData
  const enterCheckBox = event => {
    checkBoxClick(event.target.checked, event.target.value)
  }
  return (
    <li className="employ-type-list-item">
      <input
        type="checkbox"
        className="employ-type-checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        onClick={enterCheckBox}
      />
      <label className="employ-type-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmployType
