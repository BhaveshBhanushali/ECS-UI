import React, { useState } from 'react'
import { Table, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import './ecs-requests-table.scss'

const ECSRequestsTable = function ECSRequestsTable({
  ecsRequestList,
}) {
  const [filteredData, setFilteredData] = useState(ecsRequestList)
  const [sortKey, setSortKey] = useState(null)
  const [isAscSort, setIsAscSort] = useState(true)
  const [filterValues, setFilterValues] = useState({})

  const sortData = (data, key, isDate, sortAsc) => {
    let sortedData = [...data]
    if (isDate) {
      sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a[key])
        const dateB = new Date(b[key])

        return sortAsc ? dateA - dateB : dateB - dateA
      })
    } else {
      sortedData = [...data].sort((a, b) => {
        const valA = a[key].toString().toUpperCase()
        const valB = b[key].toString().toUpperCase()

        if (valA < valB) {
          return sortAsc ? -1 : 1
        }
        if (valA > valB) {
          return sortAsc ? 1 : -1
        }
        return 0
      })
    }
    return sortedData
  }

  const handleSort = (key, isDate) => {
    const sortAsc = key === sortKey ? !isAscSort : true
    const sortedData = sortData(filteredData, key, isDate, sortAsc)

    setSortKey(key)
    setIsAscSort(sortAsc)
    setFilteredData(sortedData)
  }

  const handleFilterChange = (field, value) => {
    const updatedFilter = {
      ...filterValues,
      [field]: value,
    }
    setFilterValues(updatedFilter)

    let filtered = JSON.parse(JSON.stringify(ecsRequestList))
    for (const key in updatedFilter) {
      if (updatedFilter[key]) {
        if ((key === 'reference_no' || key === 'status')) {
          filtered = filtered.filter((i) => i[key].toString().toLowerCase()
            === updatedFilter[key].toString().toLowerCase())
        } else {
          filtered = filtered.filter((i) => i[key].toString().toLowerCase()
            .includes(updatedFilter[key].toString().toLowerCase()))
        }
      }
    }

    const sortedData = sortData(filtered, sortKey, sortKey === 'issued_on', isAscSort)
    setFilteredData(sortedData)
  }

  const getHeaderCell = (colName, dataKey, hasFilter, hasSorting) => (
    <th className="align-top rq-tbl-header">
      {(hasSorting && (
        <span
          className="pb-2 d-flex w-100 justify-content-between cursorPointer"
          onClick={() => handleSort(dataKey, dataKey === 'issued_on')}
        >
          {colName}
          {(sortKey === dataKey && (
            (isAscSort && <FontAwesomeIcon className="pt-2" icon={faSortUp} />)
            || <FontAwesomeIcon icon={faSortDown} />
          )) || <FontAwesomeIcon className="pt-1" icon={faSort} />}
        </span>
      )) || (
      <span
        className="pb-2 d-flex w-100 justify-content-between"
      >
        {colName}
      </span>
      )}

      {hasFilter && (
        <Form.Control
          type="text"
          placeholder={colName}
          onChange={(e) => handleFilterChange(dataKey, e.target.value)}
          value={filterValues[dataKey] || ''}
        />
      )}
    </th>
  )

  return (
    <div className="pt-3">
      <Table striped bordered hover>
        <thead>
          <tr>
            {getHeaderCell('Reference No.', 'reference_no', true, false)}
            {getHeaderCell('Address to', 'address_to', true, false)}
            {getHeaderCell('Purpose', 'purpose', false, false)}
            {getHeaderCell('Issued on', 'issued_on', false, true)}
            {getHeaderCell('Status', 'status', true, true)}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((req) => (
            <tr key={`${req.reference_no}_${req.status}`}>
              <td>{req.reference_no}</td>
              <td>{req.address_to}</td>
              <td>{req.purpose}</td>
              <td>{req.issued_on}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
ECSRequestsTable.defaultProps = {
  ecsRequestList: [],
}

ECSRequestsTable.propTypes = {
  ecsRequestList: PropTypes.oneOfType(Array),
}

export default ECSRequestsTable
