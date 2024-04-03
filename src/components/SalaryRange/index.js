const SalaryRange = props => {
  const {radioClick, salaryRangeData} = props
  const {salaryRangeId, label} = salaryRangeData
  const enterRadio = event => {
    radioClick(event.target.value)
  }
  return (
    <li className="salary-range-list-item">
      <input
        type="radio"
        name="salaryRange"
        className="salary-range-radio"
        id={salaryRangeId}
        value={salaryRangeId}
        onClick={enterRadio}
      />
      <label className="salary-range-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
