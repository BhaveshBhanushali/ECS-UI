import React, {
  useEffect, useState,
} from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useSelector, useDispatch } from 'react-redux'
import './create-request-content.scss'
import {
  setLoaderVisibility,
  setLoadingText,
} from '../../../redux/loaderSlice'
import { setECSRequests } from '../../../redux/userSlice'
import { MESSAGE_TYPES } from '../../../data/constants'
import api from '../../../classes/api'
import PageTitle from '../../atoms/page-title'
import Modal from '../../molecules/modal'

const CreateRequestContent = function CreateRequestContent() {
  const dispatch = useDispatch()
  const history = useHistory()
  const ecsRequests = useSelector((state) => state.user.ecsRequests)

  const [isModelVisible, setIsModelVisible] = useState(false)
  const [modalType, setModalType] = useState(MESSAGE_TYPES.success)
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    address_to: '',
    purpose: '',
    issued_on: '',
    employee_id: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const showLoader = (msg) => {
    dispatch(setLoaderVisibility(true))
    dispatch(setLoadingText(msg || 'Loading...'))
  }

  const hideLoader = () => {
    dispatch(setLoaderVisibility(false))
    dispatch(setLoadingText(''))
  }

  const getECSRequestList = async () => {
    try {
      showLoader('Getting ECS Request List')
      const userResult = await api.ecsAPI.getECSRequestList()
      if (userResult && userResult.length > 0) {
        dispatch(setECSRequests(userResult))
      }
    } catch (err) {
      console.error('Failed to get ECS request list: ', err)
    } finally {
      hideLoader()
    }
  }

  const createECSCertRequest = async (data) => {
    try {
      showLoader('Create ECS Certificate Request')
      const resp = await api.ecsAPI.postECSRequestCertificate(data)
      if (resp && resp.responce === 'Ok') {
        const requests = [...ecsRequests, { ...data, reference_no: ecsRequests.length + 101, status: 'New' }]
        dispatch(setECSRequests(requests))
        setModalType(MESSAGE_TYPES.success)
      } else {
        setModalType(MESSAGE_TYPES.error)
      }
    } catch (err) {
      console.error('Failed to create ECS Certificate request: ', err)
      setModalType(MESSAGE_TYPES.error)
    } finally {
      hideLoader()
      setIsModelVisible(true)
    }
  }

  useEffect(() => {
    if (!ecsRequests) {
      getECSRequestList()
    }
  }, [ecsRequests])

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === true) {
      const data = {
        ...formData,
        issued_on: formData.issued_on.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      }
      createECSCertRequest(data)
    }

    setValidated(true)
  }

  const renderRequestForm = () => (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-3 mt-3">
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="address_to">
          <Form.Label>
            Address to
            {' '}
            <span className="requiredField">*</span>
          </Form.Label>
          <Form.Control
            required
            type="text"
            name="address_to"
            placeholder="Bank of Mars"
            value={formData.address_to}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">This is a required field</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="purpose">
          <Form.Label>
            Purpose
            {' '}
            <span className="requiredField">*</span>
          </Form.Label>
          <Form.Control
            required
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            placeholder="Certification required to open a new Bank Account"
            minLength={50}
          />
          <Form.Control.Feedback type="invalid">
            This is a required field, and its value must be of minimum 50 characters
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="issued_on">
          <Form.Label>
            Issued on
            {' '}
            <span className="requiredField">*</span>
          </Form.Label>
          <br />
          <DatePicker
            name="issued_on"
            selected={formData.issued_on}
            onChange={(date) => {
              handleInputChange({ target: { name: 'issued_on', value: date } })
            }}
            minDate={new Date()}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a future date"
            className="form-control"
            required
          />
          <Form.Control.Feedback type="invalid">
            This is a required field, and its value must be a future date
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="employee_id">
          <Form.Label>
            Employee ID
            {' '}
            <span className="requiredField">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="employee_id"
            placeholder="12345"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formData.employee_id}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            This is a required field, and it  must contain only numeric values
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
  )

  const handleModalClose = (reqState) => {
    setIsModelVisible(false)
    if (reqState === MESSAGE_TYPES.success) {
      history.push('/')
    }
  }

  return (
    <div className="row flexGrow mx-0">
      <div className="col pt-2 flexGrow align-top justify-content-start">
        <PageTitle titleText="Create Employee Certificate Request" />
        {renderRequestForm()}
      </div>
      <Modal
        modalCloseHandler={() => { handleModalClose(modalType) }}
        messageText={modalType === MESSAGE_TYPES.success ? 'Successfully Submitted Certificate Request' : 'Error Submitting Certificate Request. \n Please try again!'}
        titleText={modalType === MESSAGE_TYPES.success ? 'Success' : 'Error'}
        isVisible={isModelVisible}
        modalType={modalType}
        primaryBtnText="OK"
        primaryBtnHandler={() => { handleModalClose(modalType) }}
      />
    </div>
  )
}

export default CreateRequestContent
