import { useState } from 'react'

const SearchBar = ({
  onFilterChange,
  filterLabel = "Date of the Maintenance",
  searchPlaceholder = "Search by Vehicle ID",
}) => {
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

  const clearDate = () => {
    const newFilters = { ...filters, filterValue: '' }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="searchbar-container">
      <div className="searchbar-input-wrapper">
        <input
          type="text"
          name="vehicleId"
          placeholder={searchPlaceholder}
          value={filters.vehicleId}
          onChange={handleChange}
          className="searchbar-main-input"
        />
        <button type="button" className="searchbar-icon-btn" tabIndex={-1}>🔍</button>
      </div>

      <div className="searchbar-date-wrapper">
        <label className="searchbar-date-label" htmlFor="searchbar-date-input">
          {filterLabel}
        </label>
        <input
          id="searchbar-date-input"
          type="date"
          name="filterValue"
          value={filters.filterValue}
          onChange={handleChange}
          className="searchbar-date-input"
        />
        {filters.filterValue && (
          <button
            type="button"
            className="searchbar-date-clear"
            onClick={clearDate}
            aria-label="Clear date filter"
            title="Clear date filter"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
