import React from 'react'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './JobView.css';
import { Button } from 'react-bootstrap'
import FormModel from './FormModel';
import { Encrypt } from './TokenEncryptor.mjs';
import CircularJSON from 'circular-json';

function JobView() {
  const [showFormModel, setShowFormModel] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // To track selected row
  const [selectedRowData, setSelectedRowData] = useState(null);  // To hold selected row data
  const [Job_RowId, setDT_RowId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);  // To track new/edit mode
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const userID = localStorage.getItem('userID');
  const username = localStorage.getItem('username');
  const req_token = Encrypt(accessToken,username.toLowerCase())

  const handleOpenFormModel = () => {
    setShowFormModel(true); // Opens the primary modal
    setSelectedRowData(null);  // Clear previous data
    setIsEditMode(false);
  };

  const handleCloseFormModel = () => {
    setShowFormModel(false); // Closes the primary modal
  };

  const handleRowSelect = (DT_RowId, index) => {
    console.log('Row selected with ID:', DT_RowId);
    setSelectedRow(index);
    fetchJobData(DT_RowId);
  };

  // Disable buttons if no row is selected
  const isButtonDisabled = selectedRow === null;
  const fetchJobData = async (DT_RowId) => {
    try {
      const response = await fetch('http://localhost:3000/getEditRecordData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: CircularJSON.stringify({
          Token: req_token,
          UserID: parseInt(userID, 10),
          db_Obj: {
            ObjectName: "xsheet_JobApplicant",
            Id: DT_RowId,
            connectionString: null,
            Pk_ColumnName: "Id",
            Values: [
              { key: "name", value: '' },
              { key: "applicantname", value: '' },
              { key: "applicantcontact", value: '' },
              { key: "applicateemail", value: '' },
              { key: "englishproficiency", value: '' },
              { key: "businessUnit", value: '' },
              { key: "progress", value: '' },
              { key: "stage", value: '' },
              { key: "applicateeducation", value: '' },
              { key: "yearsofexperience", value: '' },
              { key: "currentcity", value: '' },
              { key: "source", value: '' },
              { key: "jobdescription", value: '' },
              { key: "interviewtakenbyfr", value: '' },
              { key: "firstroundoutcome", value: '' },
              { key: "commentsfr", value: '' },
              { key: "interviewtakenbym", value: '' },
              { key: "machinetest", value: '' },
              { key: "commentsm", value: '' },
              { key: "interviewtakenbyf", value: '' },
              { key: "finalround", value: '' },
              { key: "commentsf", value: '' },
            ]
          },
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Fetched record details:', result);
  
        // Extract and structure the data
        if (result && result.Result && result.Result.Table.length > 0) {
          const rowData = result.Result.Table[0];  // Extract the first item from Table array
          const structuredData = {
            applicantContact: rowData.applicantcontact,
            applicantName: rowData.applicantname,
            applicantEducation: rowData.applicateeducation,
            applicantEmail: rowData.applicateemail,
            businessUnit: rowData.businessunit,
            commentsFinal: rowData.commentsf,
            commentsFirstRound: rowData.commentsfr,
            commentsMidRound: rowData.commentsm,
            currentCity: rowData.currentcity,
            englishProficiency: String(rowData.englishproficiency),
            finalOutcome: String(rowData.finalround),
            firstOutcome: String(rowData.firstroundoutcome),
            interviewTakenByFinal: rowData.interviewtakenbyf,
            interviewTakenByFirstRound: rowData.interviewtakenbyfr,
            interviewTakenByMidRound: rowData.interviewtakenbym,
            jobDescription: rowData.jobdescription,
            machineTest: String(rowData.machinetest),
            name: rowData.name,
            progress: String(rowData.progress),
            source: rowData.source,
            stage: String(rowData.stage),
            yearsOfExperience: rowData.yearsofexperience,
          };
  
          setSelectedRowData(structuredData);
          setDT_RowId(DT_RowId);
        } else {
          console.error('Unexpected response format:', result);
        }
      } else {
        console.error('Failed to fetch record details');
      }
    } catch (error) {
      console.error('Error fetching record details:', error);
    }
  };
  console.log(selectedRowData);
  console.log(Job_RowId);
  
  const handleEditClick = async (DT_RowId) => {
    await fetchJobData(DT_RowId);  // Call the fetch function to get the job data
    setShowFormModel(true); // Open the form modal after fetching data
    setIsEditMode(true); 
  };

 
 /* const handleNewEntryClick = () => {
    setSelectedRowData(null);  // Clear previous data
    setIsEditMode(false);  // Set edit mode to false (new entry)
    setShowFormModel(true);  // Open the modal
};*/
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/getJobData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`, // Pass the access token in headers
          },
          body: JSON.stringify({
            Token: req_token,
            UserID: parseInt(userID, 10),
            db_Obj: {
              Id: 269,
            },
          }),
        });
        console.log(response);

        if (response.ok) {
          const result = await response.json();
          console.log(result, result.Result.data);
          const sortedData = result.Result.data.sort(
            (a, b) => new Date(b.CreatedOn) - new Date(a.CreatedOn)
          );
          setData(sortedData);
      
          
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, userID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
    <div className="container-fluid mt-3">
      <div className="custom-card d-flex align-items-center">
        <div className="custom-card-icon">
          <span>A</span>
        </div>
        <div className="flex-grow-1">
          <h5 className="mb-0">Job Applicants</h5>
          <div className="d-flex align-items-center">
            <select className="custom-select" id="job-applicants" defaultValue="Job Applicants">
              <option>Job Applicants</option>
              <option>Inactive Job Applicants</option>
              
            </select>
            <button className="btn btn-outline-primary p-1">
              <i className="fas fa-thumbtack"></i>
            </button>
          </div>
        </div>
        <div className="custom-btn d-flex align-items-center justify-content-center">
          <button className="btn btn-success btn-sm mx-1" onClick={handleOpenFormModel}><i className="fas fa-plus"></i> New</button>
          <button className={`btn btn-sm mx-1 ${isButtonDisabled ? 'btn-secondary' : 'btn-primary'}`} onClick={handleEditClick} disabled={isButtonDisabled}><i className="fas fa-edit"></i> Edit</button>
          <button className={`btn btn-sm mx-1 ${isButtonDisabled ? 'btn-secondary' : 'btn-danger'}`} disabled={isButtonDisabled}><i className="fas fa-trash" disabled={selectedRow === null}></i> Trash</button>
        </div>
      </div>
    </div>
    <div className="container-fluid mt-3">
    <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Applicant Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile Phone</th>
            <th scope="col">Source</th>
            <th scope="col">Stage</th>
            <th scope="col">Progress</th>
            <th scope="col">Business Unit</th>
            <th scope="col">Created On</th>
          </tr>
        </thead>
        <tbody>
        {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.DT_RowId} onClick={() => handleRowSelect(item.DT_RowId, index)} className={selectedRow === index ? 'table-active' : ''}>
                  <td>{item.ApplicantName}</td>
                  <td>{item.ApplicateEmail}</td>
                  <td>{item.ApplicantContact}</td>
                  <td>{item.Source}</td>
                  <td>{item.Stage}</td>
                  <td>{item.Progress}</td>
                  <td>{item.BusinessUnit}</td>
                  <td>{new Date(item.CreatedOn).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )} 
        </tbody>
      </table>
      <FormModel show={showFormModel} handleClose={handleCloseFormModel} selectedRowData={selectedRowData} Job_RowId={Job_RowId} isEditMode={isEditMode}/>
    </div>
    </>


  )
}

export default JobView;