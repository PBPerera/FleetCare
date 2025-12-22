import { useState } from 'react'

const SearchBar = ({ onFilterChange, filterLabel = "Date of the Maintenance" }) => {
  const [filters, setFilters] = useState({
    vehicleId: '',
    filterValue: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="searchbar-container">
      <div className="searchbar-input-wrapper">
        <input
          type="text"
          name="vehicleId"
          placeholder="Search by Vehicle ID"
          value={filters.vehicleId}
          onChange={handleChange}
          className="searchbar-main-input"
        />
        <button className="searchbar-icon-btn">🔍</button>
      </div>
      
      <select
        name="filterValue"
        value={filters.filterValue}
        onChange={handleChange}
        className="searchbar-select"
      >
        <option value="">{filterLabel}</option>
        <option value="2025-08-20">08-20-2025</option>
        <option value="2025-09-25">09-25-2025</option>
        <option value="2025-09-27">09-27-2025</option>
      </select>
    </div>
  )
}

export default SearchBar