import React from 'react'
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import './JobView.css';
import ScreeningTab from './ScreeningTab';
import { useState, useEffect } from 'react'
import { Encrypt } from './TokenEncryptor.mjs'; //user Id and Password token algorithm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import BusinessUnitModel from './BusinessUnitModel';
import InterviewModel from './InterviewModel';
import InterviewModelSec from './InterviewModelSec';
import FinalInterviewModel from './FinalInterviewModel';


const FormModel = ({ show, handleClose, isEditMode, selectedRowData,Job_RowId, showBuModal, handleCloseBu, showInterviewModal, handleCloseInterview, showInterviewSecModal, handleCloseInterviewSec, showFinalInterviewModal, handleCloseFinalInterview}) => {
    const [showBuModal, setShowBuModal] = useState(false);
    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [showInterviewSecModal, setShowInterviewSecModal] = useState(false);
    const [showFinalInterviewModal, setShowFinalInterviewModal] = useState(false);
    const [selectedBusinessItem, setSelectedBusinessItem] = useState('');
    const [selectedBusinessItemId, setSelectedBusinessItemId] = useState(null);
    const [selectedInterviewItem, setSelectedInterviewItem] = useState('');
    const [selectedInterviewItemId, setSelectedInterviewItemId] = useState(null);
    const [selectedInterviewSecItem, setSelectedInterviewSecItem] = useState('');
    const [selectedInterviewSecItemId, setSelectedInterviewSecItemId] = useState(null);
    const [selectedFinalInterviewItem, setSelectedFinalInterviewItem] = useState('');
    const [selectedFinalInterviewItemId, setSelectedFinalInterviewItemId] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const req_token = Encrypt(accessToken, username.toLowerCase());
    const [formData, setFormData] = useState({
      postName: '',
      applicantName: '',
      applicantContact: '',
      applicantEmail: '',
      englishProficiency: null,
      businessUnit: '',
      businessUnitId: '',
      progress: null,
      stage: null,
      highestEducation: '',
      yearExp: '',
      currentCity: '',
      source: '',
      description: '',
      firstInterview: '',
      firstOutcome: null,
      firstComments: '',
      secondInterview: '',
      machineTest: null,
      secondComments: '',
      finalInterview: '',
      finalOutcome: null,
      finalComments: '',
    });
    //For Dropdown Fields
    //For Progress
    const optionsProgress = [
      { value: '1', label: 'Screening' },
      { value: '2', label: 'First Interview' },
      { value: '3', label: 'Machine Test' },
      { value: '4', label: 'Final Interview' },
      { value: '5', label: 'HR Round' },
    ];
    //For English Proficiency
    const optionsEnglishProficiency = [
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
    ]
    //For Stage
    const optionsStage = [
      { value: '1', label: 'Active' },
      { value: '2', label: 'Inactive' },
      { value: '3', label: 'On Hold' }
    ]
    //First Outcome
    const optionsFirstOutcome = [
      { value: '1', label: 'Selected' },
      { value: '2', label: 'Rejected' },
      { value: '3', label: 'Did Not Happened' }
    ]
    //Second Outcome
    const optionsSecondOutcome = [
      { value: '1', label: 'Selected' },
      { value: '2', label: 'Rejected' },
      { value: '3', label: 'Did Not Happened' }
    ]
    //Final Outcome
    const optionsFinalOutcome = [
      { value: '1', label: 'Selected' },
      { value: '2', label: 'Rejected' },
      { value: '3', label: 'Did Not Happened' }
    ]

    //For Edit Records

    useEffect(() => {
      if (isEditMode && selectedRowData) {
          // Populate form fields with the fetched data for editing
          setFormData({
              postName: selectedRowData.name|| '',
              applicantName: selectedRowData.applicantName || '',
              applicantContact: selectedRowData.applicantContact || '',
              applicantEmail: selectedRowData.applicantEmail || '',
              englishProficiency: selectedRowData.englishProficiency || '',
              businessUnit: selectedRowData.businessUnit.Name || '',
              progress: selectedRowData.progress || '',
              stage: selectedRowData.stage || '',
              highestEducation: selectedRowData.applicantEducation || '',
              yearExp: selectedRowData.yearsOfExperience || '',
              currentCity: selectedRowData.currentCity || '',
              source: selectedRowData.source || '',
              description: selectedRowData.jobDescription || '',
              firstInterview: selectedRowData.interviewTakenByFirstRound.Name || '',
              firstOutcome: selectedRowData.firstOutcome || '',
              firstComments: selectedRowData.commentsFirstRound || '',
              secondInterview: selectedRowData.interviewTakenByMidRound.Name || '',
              machineTest: selectedRowData.machineTest || '',
              secondComments: selectedRowData.commentsMidRound || '',
              finalInterview: selectedRowData.interviewTakenByFinal.Name || '',
              finalOutcome: selectedRowData.finalOutcome || '',
              finalComments: selectedRowData.commentsFinal || '',
          });
  
          // Set related items based on fetched data
          setSelectedBusinessItem(selectedRowData.businessUnit.Name || '');
          setSelectedBusinessItemId(selectedRowData.businessUnit.Id || null);
          setSelectedInterviewItem(selectedRowData.interviewTakenByFirstRound.Name || '');
          setSelectedInterviewItemId(selectedRowData.interviewTakenByFirstRound.Id || null);
          setSelectedInterviewSecItem(selectedRowData.interviewTakenByMidRound.Name || '');
          setSelectedInterviewSecItemId(selectedRowData.interviewTakenByMidRound.Id || null);
          setSelectedFinalInterviewItem(selectedRowData.interviewTakenByFinal.Name || '');
          setSelectedFinalInterviewItemId(selectedRowData.interviewTakenByFinal.Id || null);
      } else {
          // Initialize form fields for a new entry
          setFormData({
              postName: '',
              applicantName: '',
              applicantContact: '',
              applicantEmail: '',
              englishProficiency: null,
              businessUnitId: '',
              progress: null,
              stage: null,
              highestEducation: '',
              yearExp: '',
              currentCity: '',
              source: '',
              description: '',
              firstInterview: '',
              firstOutcome: null,
              firstComments: '',
              secondInterview: '',
              machineTest: null,
              secondComments: '',
              finalInterview: '',
              finalOutcome: null,
              finalComments: '',
          });
  
          // Clear related items for a new entry
          setSelectedBusinessItem('');
          setSelectedBusinessItemId(null);
          setSelectedInterviewItem('');
          setSelectedInterviewItemId(null);
          setSelectedInterviewSecItem('');
          setSelectedInterviewSecItemId(null);
          setSelectedFinalInterviewItem('');
          setSelectedFinalInterviewItemId(null);
      }
  }, [isEditMode, selectedRowData]);
    
    //Business Model
    const handleSearchClick = () => {
      console.log("You have clicked on search");
      setShowBuModal(true);
  };

  const handleCloseBu = () => setShowBuModal(false);

  

  //Interview Modal
  const handleInterviewClick = () => {
    console.log("You have clicked on search");
    setShowInterviewModal(true);
};

const handleCloseInterview = () => setShowInterviewModal(false);



//Interview Sec Modal
const handleInterviewSecClick = () => {
  console.log("You have clicked on search");
  setShowInterviewSecModal(true);
};

const handleCloseInterviewSec = () => setShowInterviewSecModal(false);



//Interview Fin Modal
const handleFinalInterview = () => {
  console.log("You have clicked on search");
  setShowFinalInterviewModal(true);
};

const handleCloseFinalInterview = () => setShowFinalInterviewModal(false);



    // Handle input change for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //const handleSelectBusinessItem = (itemName) => {
  //  setSelectedBusinessItem(itemName);
  const handleSelectBusinessItem = (name, DT_RowId) => {
    setSelectedBusinessItem(name);
    setSelectedBusinessItemId(DT_RowId);
};

const handleSelectInterviewItem = (DisplayName, DT_RowId ) => {
  setSelectedInterviewItem(DisplayName);
  setSelectedInterviewItemId(DT_RowId);
};
const handleSelectInterviewSecItem = (DisplayName, DT_RowId) => {
  setSelectedInterviewSecItem(DisplayName);
  setSelectedInterviewSecItemId(DT_RowId);
};
const handleSelectInterviewFinalItem = (DisplayName, DT_RowId) => {
  setSelectedFinalInterviewItem(DisplayName);
  setSelectedFinalInterviewItemId(DT_RowId);
};


    // Handle select input change
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine if it's an edit or a new entry based on the presence of DT_RowId
    const isEditMode = Job_RowId ? true : false;

    const newItem = {
        Token: req_token,
        UserID: parseInt(userID, 10),
        db_Obj: {
            ID: isEditMode ? Job_RowId : -1,  // Use DT_RowId if editing, otherwise -1 for new record
            connectionString: null,
            Pk_ColumnName: "Id",
            ObjectName: "xsheet_JobApplicant",
            Values: [
              { key: "name", value: formData.postName },
              { key: "applicantname", value: formData.applicantName },
              { key: "applicantcontact", value: formData.applicantContact },
              { key: "applicateemail", value: formData.applicantEmail },
              { key: "englishproficiency", value: formData.englishProficiency },
              { key: "businessUnit", value: selectedBusinessItemId.toString() },
              { key: "progress", value: formData.progress },
              { key: "stage", value: formData.stage },
              { key: "applicateeducation", value: formData.highestEducation },
              { key: "yearsofexperience", value: formData.yearExp },
              { key: "currentcity", value: formData.currentCity },
              { key: "source", value: formData.source },
              { key: "jobdescription", value: formData.description },
              { key: "interviewtakenbyfr", value: selectedInterviewItemId.toString() },
              { key: "firstroundoutcome", value: formData.firstOutcome },
              { key: "commentsfr", value: formData.firstComments },
              { key: "interviewtakenbym", value: selectedInterviewSecItemId.toString() },
              { key: "machinetest", value: formData.machineTest },
              { key: "commentsm", value: formData.secondComments },
              { key: "interviewtakenbyf", value: selectedFinalInterviewItemId.toString() },
              { key: "finalround", value: formData.finalOutcome },
              { key: "commentsf", value: formData.finalComments },
            ]
        }
    };

    try {
        // Submit data to the same API
        const response = await fetch('http://localhost:3000/saveUpdateRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        const result = await response.json();
        console.log(result);

        // Show a success message based on the operation type
        if (isEditMode) {
            alert('Record updated successfully!');
        } else {
            alert('Record created successfully!');
        }

        console.log('Form submitted data:', newItem);
    } catch (error) {
        console.error('Error submitting item:', error);
        alert('Error while submitting the record. Please try again.');
    }

    handleClose(); // Close the modal after submission
};
     //Fetch Business Unit data
     

  return (
    <>
    {/* New Form Model */}
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
        <Form className="Form-Style" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPostName">
                <Form.Label>Post Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="postName" value={formData.postName} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formApplicantName">
                <Form.Label>Applicant Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="applicantName" value={formData.applicantName} onChange={handleInputChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formMobilePhone">
                <Form.Label>Mobile Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="applicantContact" value={formData.applicantContact} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Applicant Email <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="applicantEmail" value={formData.applicantEmail} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <Form.Group controlId="formEnglishProficiency">
                <Form.Label>English Proficiency</Form.Label>
                <Select 
                  key={isEditMode ? selectedRowData?.englishProficiency : 'new'}
                  placeholder="Select"
                  options={optionsEnglishProficiency}
                  name="englishProficiency"
                  onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'englishProficiency' })}
                  value={optionsEnglishProficiency.find(option => option.value === formData.englishProficiency) || null}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBusinessUnit">
                <Form.Label>Business Unit <span className="text-danger">*</span></Form.Label>
                <Row>
                <Col md={11}>
                      <Form.Control type="text" name="businessUnit" value={selectedBusinessItem} readOnly
                        plaintext onChange={handleInputChange} className="form-control-grey-bg view-only-input"/>
                </Col>
                
                <Col md={1}>
                <button type="button" className="icon-button" onClick={handleSearchClick}>
                 <i className="fa fa-search"></i> {/* You can use an icon library like FontAwesome */}
                </button>
                </Col>
                </Row>
                
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProgress">
                <Form.Label>Progress </Form.Label>
                  <Select
                    key={isEditMode ? selectedRowData?.progress : 'new'}
                    name="progress"
                    options={optionsProgress}
                    placeholder="Select"
                    onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'progress' })}
                    value={optionsProgress.find(option => option.value === formData.progress) || null}
                  />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formHighestEducation">
                <Form.Label>Highest Education <span className="text-danger">*</span></Form.Label>
                <Form.Control as="textarea" rows={3} name="highestEducation" value={formData.highestEducation} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formYearsExp">
                <Form.Label>Years of Experience </Form.Label>
                <Form.Control type="text" name="yearExp" value={formData.yearExp} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCurrentCity">
                <Form.Label>Current City <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="currentCity" value={formData.currentCity} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formStage">
                <Form.Label>Stage </Form.Label>
                <Select 
                  key={isEditMode ? selectedRowData?.stage : 'new'}
                  placeholder="Select"
                  options={optionsStage}
                  name="stage"
                  onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'stage' })}
                  value={optionsStage.find(option => option.value === formData.stage) || null}
                  
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formSource">
                <Form.Label>Source </Form.Label>
                <Form.Control type="text" name="source" value={formData.source} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description </Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange}/>
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
                <Row>
                <Col md={11}>
                      <Form.Control type="text" name="firstInterview" value={selectedInterviewItem} readOnly
                        plaintext onChange={handleInputChange} className="form-control-grey-bg view-only-input"/>
                </Col>
                <Col md={1}>
                <button type="button" className="icon-button" onClick={handleInterviewClick}>
                 <i className="fa fa-search"></i> {/* You can use an icon library like FontAwesome */}
                </button>
                </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formFirstOutcome">
                <Form.Label>First Round Outcome </Form.Label>
                <Select
                  key={isEditMode ? selectedRowData?.firstOutcome : 'new'} 
                  placeholder="Select"
                  options={optionsFirstOutcome}
                  name="firstOutcome"
                  onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'firstOutcome' })}
                  value={optionsFirstOutcome.find(option => option.value === formData.firstOutcome) || null}
                  
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <Form.Group controlId="formComments">
                <Form.Label>Comments </Form.Label>
                <Form.Control as="textarea" rows={3} name="firstComments" value={formData.firstComments} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
          </Row>
          <p className="form-section-header">Second Round Interview</p>
          <hr className="form-section-divider" />
          <Row>
          <Col md={6}>
              <Form.Group controlId="formSecondInterviewTaken">
                <Form.Label>Interview Taken By </Form.Label>
                <Row>
                <Col md={11}>
                      <Form.Control type="text" name="secondInterview" value={selectedInterviewSecItem} readOnly
                        plaintext onChange={handleInputChange} className="form-control-grey-bg view-only-input"/>
                </Col>
                <Col md={1}>
                <button type="button" className="icon-button" onClick={handleInterviewSecClick}>
                 <i className="fa fa-search"></i> {/* You can use an icon library like FontAwesome */}
                </button>
                </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formMachineTest">
                <Form.Label>Machine Test </Form.Label>
                <Select 
                  key={isEditMode ? selectedRowData?.machineTest : 'new'}
                  placeholder="Select"
                  options={optionsSecondOutcome}
                  name="machineTest"
                  onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'machineTest' })}
                  value={optionsSecondOutcome.find(option => option.value === formData.machineTest) || null}
                  
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <Form.Group controlId="formSecondComments">
                <Form.Label>Comments </Form.Label>
                <Form.Control as="textarea" rows={3} name="secondComments" value={formData.secondComments} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
          </Row>
          <p className="form-section-header">Final Round Interview</p>
          <hr className="form-section-divider" />
          <Row>
          <Col md={6}>
              <Form.Group controlId="formFinalInterviewTaken">
                <Form.Label>Interview Taken By </Form.Label>
                <Row>
                <Col md={11}>
                      <Form.Control type="text" name="finalInterview" value={selectedFinalInterviewItem} readOnly
                        plaintext onChange={handleInputChange} className="form-control-grey-bg view-only-input"/>
                </Col>
                <Col md={1}>
                <button type="button" className="icon-button" onClick={handleFinalInterview}>
                 <i className="fa fa-search"></i> {/* You can use an icon library like FontAwesome */}
                </button>
                </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formFinalOutcome">
                <Form.Label>Final Round  </Form.Label>
                <Select 
                  key={isEditMode ? selectedRowData?.finalOutcome : 'new'}
                  placeholder="Select"
                  options={optionsFinalOutcome}
                  name="finalOutcome"
                  onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'finalOutcome' })}
                  value={optionsFinalOutcome.find(option => option.value === formData.finalOutcome) || null}
                 
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <Form.Group controlId="formFinalComments">
                <Form.Label>Comments </Form.Label>
                <Form.Control as="textarea" rows={3} name="finalComments" value={formData.finalComments} onChange={handleInputChange}/>
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
          <div className='d-flex justify-content-end mt-4 custom-footer'>
             <Button variant="secondary" onClick={handleClose} className="custom-button">Close</Button>
             <Button variant="primary" type="submit" className="custom-button">Submit</Button>
         </div>
          
      
        </Form>
        
    </Modal.Body>
    {/* <Modal.Footer> */}
     
      
    {/* </Modal.Footer> */}
    
  </Modal>
  {/* Business Unit Model */}
  <BusinessUnitModel showBuModal={showBuModal} handleCloseBu={handleCloseBu} onSelectBusinessItem={handleSelectBusinessItem}/>
  {/* Interview Model */}
  <InterviewModel showInterviewModal={showInterviewModal} handleCloseInterview={handleCloseInterview} onSelectInterviewItem={handleSelectInterviewItem}/>
   {/* Interview Sec Model */}
  <InterviewModelSec showInterviewSecModal={showInterviewSecModal} handleCloseInterviewSec={handleCloseInterviewSec} onSelectInterviewSecItem={handleSelectInterviewSecItem}/>
  {/* Interview Fin Model */}
  <FinalInterviewModel showFinalInterviewModal={showFinalInterviewModal} handleCloseFinalInterview={handleCloseFinalInterview} onSelectInterviewItemFinal={handleSelectInterviewFinalItem}/>
  </>
    
  )
}

export default FormModel