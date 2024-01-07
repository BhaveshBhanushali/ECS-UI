/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable new-cap */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFloppyDisk, faPenToSquare, faRectangleXmark,
} from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { setECSRequests } from '../../../../redux/userSlice'
import './ecs-request-details.scss'

const ECSRequestDetails = function ECSRequestDetails({
  ecsRequest, showModal, onModalClose,
}) {
  const dispatch = useDispatch()
  const allECSRequests = useSelector((state) => state.user.ecsRequests)

  const pdfPreviewRef = useRef(null)
  const [requestDtls, setRequestDtls] = useState(null)
  const [validated, setValidated] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [prevPurpose, setPrevPurpose] = useState('')

  useEffect(() => {
    setRequestDtls(ecsRequest)
    setPrevPurpose(ecsRequest?.purpose || '')
  }, [ecsRequest])

  const generateAndDisplayPdf = () => {
    const content = document.getElementById('cntrCertDtls')

    html2canvas(content).then((canvas) => {
      const pdf = new jsPDF()

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight())

      const blob = pdf.output('blob')
      const pdfUrl = URL.createObjectURL(blob)

      if (pdfUrl) {
        pdfPreviewRef.current.src = pdfUrl
      }
    })
  }

  useEffect(() => {
    if (requestDtls && requestDtls.status && requestDtls.status?.toLowerCase() === 'done') {
      setTimeout(() => {
        generateAndDisplayPdf()
      })
    }
  }, [requestDtls])

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === true) {
      console.info('Update Req Store')

      const index = allECSRequests.findIndex((r) => r.reference_no === ecsRequest.reference_no
        && r.status === ecsRequest.status && r.purpose === prevPurpose
        && r.address_to === ecsRequest.address_to && r.issued_on === ecsRequest.issued_on)
      console.info('index', index)
      if (index !== -1) {
        const updatedRequests = JSON.parse(JSON.stringify(allECSRequests))
        updatedRequests[index] = requestDtls
        console.info('index updatedRequests', updatedRequests)
        setPrevPurpose(requestDtls.purpose)
        dispatch(setECSRequests(updatedRequests))
      }
      setIsEditing(false)
    }

    setValidated(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRequestDtls((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const discardChanges = () => {
    setRequestDtls(ecsRequest)
    setIsEditing(false)
  }

  return (
    <Modal show={showModal} fullscreen onHide={onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Certificate Requests Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(requestDtls && (
          <div className="row full-height-container">
            <div className="col-6 certDtlsContainer" id="cntrCertDtls">
              <div className="row">
                <div className="col-2 rqDtlLabel mt-1"> Reference No. </div>
                <div className="col rqDtlValue mt-1">
                  {' '}
                  {requestDtls?.reference_no || '-'}
                  {' '}
                </div>
              </div>
              <div className="row">
                <div className="col-2 rqDtlLabel mt-1"> Address to </div>
                <div className="col rqDtlValue mt-1">
                  {' '}
                  {requestDtls?.address_to || '-'}
                  {' '}
                </div>
              </div>
              <div className="row">
                <div className="col-2 rqDtlLabel mt-1"> Purpose </div>
                <div className="col rqDtlValue mt-1">
                  {' '}
                  {!(isEditing) && (requestDtls?.purpose || '-')}
                  {(!isEditing && requestDtls.status && requestDtls?.status?.toLowerCase() === 'new') && (
                    <button className="miniBtn col mx-2" type="button" onClick={() => { setIsEditing(true) }}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  )}
                  {isEditing && requestDtls.status && requestDtls?.status?.toLowerCase() === 'new'
                    && (
                      <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-0 m-0">
                        <Row className="m-0">
                          <Form.Group as={Col} className="m-0 p-0" controlId="purpose">
                            {/* <Form.Label>
                          Purpose
                          {' '}
                          <span className="requiredField">*</span>
                        </Form.Label> */}
                            <Form.Control
                              required
                              type="text"
                              name="purpose"
                              value={requestDtls.purpose}
                              onChange={handleInputChange}
                              placeholder="Certification required to open a new Bank Account"
                              minLength={50}
                            />
                            <Form.Control.Feedback type="invalid">
                              This is a required field,
                              and its value must be of minimum 50 characters
                            </Form.Control.Feedback>
                          </Form.Group>
                          <button className="miniBtn col p-0  m-2" type="submit">
                            <FontAwesomeIcon icon={faFloppyDisk} />
                          </button>
                          <button className="miniBtn col p-0  m-2" type="button" onClick={discardChanges}>
                            <FontAwesomeIcon icon={faRectangleXmark} />
                          </button>
                        </Row>
                      </Form>
                    )}
                  {' '}
                </div>
              </div>
              {requestDtls.status && requestDtls?.status?.toLowerCase() === 'done'
                && (
                  <div className="row">
                    <div className="col-2 rqDtlLabel mt-1"> Issued on </div>
                    <div className="col rqDtlValue mt-1">
                      {' '}
                      {requestDtls?.issued_on || '-'}
                      {' '}
                    </div>
                  </div>
                )}
              <div className="row">
                <div className="col-2 rqDtlLabel mt-1"> Status </div>
                <div className="col rqDtlValue mt-1">
                  {' '}
                  {requestDtls?.status || '-'}
                  {' '}
                </div>
              </div>
            </div>
            <div className="col-6 ps-0 certPdfViewContainer" id="cntrPDFCertPreview">
              {(requestDtls.status && requestDtls?.status?.toLowerCase() === 'done'
                && (
                  <iframe ref={pdfPreviewRef} title="PDF Preview" width="100%" height="100%" />
                )) || <>Certificate is yet to be issued.</>}
            </div>
          </div>
        )) || <>Request details are not available</>}
      </Modal.Body>
    </Modal>
  )
}
ECSRequestDetails.defaultProps = {
  ecsRequest: {},
  showModal: false,
  onModalClose: () => { },
}

ECSRequestDetails.propTypes = {
  ecsRequest: PropTypes.oneOfType([PropTypes.object]),
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
}

export default ECSRequestDetails
