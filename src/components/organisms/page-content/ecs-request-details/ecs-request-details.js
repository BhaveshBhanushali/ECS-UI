/* eslint-disable new-cap */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './ecs-request-details.scss'

const ECSRequestDetails = function ECSRequestDetails({
  ecsRequest, showModal, onModalClose,
}) {
  const pdfPreviewRef = useRef(null)
  const [requestDtls, setRequestDtls] = useState(null)

  useEffect(() => {
    setRequestDtls(ecsRequest)
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
                  {requestDtls?.purpose || '-'}
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
