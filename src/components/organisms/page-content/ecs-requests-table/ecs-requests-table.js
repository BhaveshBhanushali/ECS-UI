import React, { useState } from 'react'
import { Table, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './ecs-requests-table.scss'

const ECSRequestsTable = function ECSRequestsTable({
  ecsRequestList,
}) {
  const [filteredData, setFilteredData] = useState(ecsRequestList)
  const [sortKey, setSortKey] = useState(null)
  const [filterValues, setFilterValues] = useState({})

  const handleFilterChange = (field, value) => {
    const updatedFilter = {
      ...filterValues,
      [field]: value,
    }
    setFilterValues(updatedFilter)

    let filtered = JSON.parse(JSON.stringify(ecsRequestList))
    for (const key in updatedFilter) {
      if (updatedFilter[key]) {
        filtered = filtered.filter((i) => i[key].toString().toLowerCase()
          .includes(updatedFilter[key].toString().toLowerCase()))
      }
    }
    setFilteredData(filtered)
  }

  const handleSort = (key) => {
    const sortedData = [...filteredData].sort((a, b) => a[key].localeCompare(b[key]))

    setSortKey(key)
    setFilteredData(sortedData)
  }

  const getHeaderCell = (colName, dataKey, hasFilter, hasSorting) => (
    <th>
      {colName}

      {hasFilter && (
        <Form.Control
          type="text"
          placeholder={colName}
          onChange={(e) => handleFilterChange(dataKey, e.target.value)}
          value={filterValues[dataKey] || ''}
        />
      )}

      {hasSorting && (
        <span onClick={() => handleSort(dataKey)}>
          {(sortKey === dataKey && 'DEC') || 'ASC'}
        </span>
      )}
    </th>
  )

  return (
    <div>
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
