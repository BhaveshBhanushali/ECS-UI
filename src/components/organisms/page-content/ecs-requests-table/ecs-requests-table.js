/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Table, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSort, faSortUp, faSortDown, faFileInvoice,
} from '@fortawesome/free-solid-svg-icons'
import ECSRequestDetails from '../ecs-request-details'
import IconBtn from '../../../atoms/icon-btn'
import './ecs-requests-table.scss'

const ECSRequestsTable = function ECSRequestsTable() {
  const ecsRequestList = useSelector((state) => state.user.ecsRequests, shallowEqual)

  const [filteredData, setFilteredData] = useState(ecsRequestList)
  const [sortKey, setSortKey] = useState(null)
  const [isAscSort, setIsAscSort] = useState(true)
  const [filterValues, setFilterValues] = useState({})
  const [selectedReqDetails, setSelectedReqDetails] = useState(null)
  const [isRequestDetailsVisible, setIsRequestDetailsVisible] = useState(false)

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
    let updatedFilter = filterValues
    if (field && value) {
      updatedFilter = {
        ...filterValues,
        [field]: value,
      }
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

    if (sortKey) {
      filtered = sortData(filtered, sortKey, sortKey === 'issued_on', isAscSort)
    }

    setFilteredData(filtered)
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
      ))
        || (
          <span className="pb-2 d-flex w-100 justify-content-between">
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

  useEffect(() => {
    console.info('called INNN ====>> ', ecsRequestList)
    handleFilterChange()
  }, [ecsRequestList])

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
            <th className="align-top rq-tbl-header">
              {' '}
            </th>
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
              <td>
                <IconBtn
                  icon={faFileInvoice}
                  onClickHandler={() => {
                    setSelectedReqDetails(req)
                    setIsRequestDetailsVisible(true)
                  }}
                  btnClass="py-2"
                  tooltipText="View Certificate Details"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ECSRequestDetails
        ecsRequest={selectedReqDetails}
        showModal={isRequestDetailsVisible}
        onModalClose={() => {
          setIsRequestDetailsVisible(false)
          setSelectedReqDetails(null)
        }}
      />
    </div>
  )
}
// ECSRequestsTable.defaultProps = {
//   ecsRequestList: [],
// }

// ECSRequestsTable.propTypes = {
//   ecsRequestList: PropTypes.oneOfType([PropTypes.array]),
// }

export default ECSRequestsTable
