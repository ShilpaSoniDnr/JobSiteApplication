import React from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './JobView.css';
import ScreeningTab from './ScreeningTab';

const FormModel = ({ show, handleClose }) => {
  return (
    <>
    <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
    <Modal.Header closeButton className="custom-modal-header">
        <div className="d-flex align-items-center">
          <div className="avatar">A</div>
          <h5 className="ml-3 mb-0">Job Applicant</h5>
        </div>
      </Modal.Header>
      <ScreeningTab/>
    <Modal.Body>
    <p className="form-section-header">General Information</p>
        <hr className="form-section-divider" />
        <Form className="Form-Style">
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPostName">
                <Form.Label>Post Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formApplicantName">
                <Form.Label>Applicant Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formMobilePhone">
                <Form.Label>Mobile Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Applicant Email <span className="text-danger">*</span></Form.Label>
                <Form.Control type="email" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <Form.Group controlId="formEnglishProficiency">
                <Form.Label>English Proficiency</Form.Label>
                <Select 
                  placeholder="Select"
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                    { value: '4', label: '4' },
                    { value: '5', label: '5' },
                    { value: '6', label: '6' },
                    { value: '7', label: '7' },
                    { value: '8', label: '8' },
                    { value: '9', label: '9' },
                    { value: '10', label: '10' }
                  ]}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBusinessUnit">
                <Form.Label>Business Unit <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProgress">
                <Form.Label>Progress </Form.Label>
                <Select 
                  placeholder="Select"
                  options={[
                    { value: 'Screening', label: 'Screening' },
                    { value: 'First Interview', label: 'First Interview' },
                    { value: 'Machine Test', label: 'Machine Test' },
                    { value: 'Final Interview', label: 'Final Interview' },
                    { value: 'HR Round', label: 'HR Round' }
                  ]}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formHighestEducation">
                <Form.Label>Highest Education <span className="text-danger">*</span></Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formYearsExp">
                <Form.Label>Years of Experience </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCurrentCity">
                <Form.Label>Current City <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formStage">
                <Form.Label>Progress </Form.Label>
                <Select 
                  placeholder="Select"
                  options={[
                    { value: 'Active', label: 'Active' },
                    { value: 'Inactive', label: 'Inactive' },
                    { value: 'On Hold', label: 'On Hold' }
                  ]}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formSource">
                <Form.Label>Source </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description </Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={6}>
              <p>Applicant Photo<br></br>
              <b>To enable upload please save the record</b></p>
            </Col>
        </Row>
          <p className="form-section-header">First Round Interview</p>
          <hr className="form-section-divider" />
          <Row>
          <Col md={6}>
              <Form.Group controlId="formInterviewTaken">
                <Form.Label>Interview Taken By </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formFirstOutcome">
                <Form.Label>First Round Outcome </Form.Label>
                <Select 
                  placeholder="Select"
                  options={[
                    { value: 'Selected', label: 'Selected' },
                    { value: 'Rejected', label: 'Rejected' },
                    { value: 'Did Not Happened', label: 'Did Not Happened' }
                  ]}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <Form.Group controlId="formComments">
                <Form.Label>Comments </Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Col>
          </Row>
          <p className="form-section-header">Second Round Interview</p>
          <hr className="form-section-divider" />
          <Row>
          <Col md={6}>
              <Form.Group controlId="formSecondInterviewTaken">
                <Form.Label>Interview Taken By </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formMachineTest">
                <Form.Label>Machine Test </Form.Label>
                <Select 
                  placeholder="Select"
                  options={[
                    { value: 'Selected', label: 'Selected' },
                    { value: 'Rejected', label: 'Rejected' },
                    { value: 'Did Not Happened', label: 'Did Not Happened' }
                  ]}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <Form.Group controlId="formSecondComments">
                <Form.Label>Comments </Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Col>
          </Row>
          <p className="form-section-header">Final Round Interview</p>
          <hr className="form-section-divider" />
          <Row>
          <Col md={6}>
              <Form.Group controlId="formFinalInterviewTaken">
                <Form.Label>Interview Taken By </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formFinalOutcome">
                <Form.Label>Final Round  </Form.Label>
                <Select 
                  placeholder="Select"
                  options={[
                    { value: 'Selected', label: 'Selected' },
                    { value: 'Rejected', label: 'Rejected' },
                    { value: 'Did Not Happened', label: 'Did Not Happened' }
                  ]}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <Form.Group controlId="formFinalComments">
                <Form.Label>Comments </Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={6}>
              <p>Resume (in pdf ,doc, docx)<br></br>
              <b>To enable upload please save the record</b></p>
            </Col>
            <Col md={6}>
              <p>Round One Applicant Picture<br></br>
              <b>To enable upload please save the record</b></p>
            </Col>
          </Row>
          <Row>
          <Col md={6}>
              <p>Round Two Applicant Picture<br></br>
              <b>To enable upload please save the record</b></p>
            </Col>
            <Col md={6}>
              <p>HR Round Applicant Picture<br></br>
              <b>To enable upload please save the record</b></p>
            </Col>
          </Row>
        </Form>
        
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  </>
    
  )
}

export default FormModel