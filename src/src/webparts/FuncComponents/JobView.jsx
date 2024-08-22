import React from 'react'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './JobView.css';
import { Button } from 'react-bootstrap'
import FormModel from './FormModel';
import { Encrypt } from './TokenEncryptor.mjs';

function JobView() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const userID = localStorage.getItem('userID');
  const username = localStorage.getItem('username');
  const req_token = Encrypt(accessToken,username.toLowerCase())

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
          console.log('Table Data:', data);
          
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
          <button className="btn btn-success btn-sm mx-1"><i className="fas fa-plus" onClick={handleShow}></i> New</button>
          <button className="btn btn-primary btn-sm mx-1"><i className="fas fa-edit" onClick={handleShow}></i> Edit</button>
          <button className="btn btn-danger btn-sm mx-1"><i className="fas fa-trash"></i> Trash</button>
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
                <tr key={index}>
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
            {/*<tr>
                <td>Test</td>
                <td>Test@gmail.com</td>
                <td>8976542457</td>
                <td>Data</td>
                <td>Collection</td>
                <td>In Progress</td>
                <td>Collaboration</td>
                <td>12 Aug 2024</td>
            </tr>
            <tr>
                <td>Test</td>
                <td>Test@gmail.com</td>
                <td>8976542457</td>
                <td>Data</td>
                <td>Collection</td>
                <td>In Progress</td>
                <td>Collaboration</td>
                <td>12 Aug 2024</td>
            </tr>
            <tr>
                <td>Test</td>
                <td>Test@gmail.com</td>
                <td>8976542457</td>
                <td>Data</td>
                <td>Collection</td>
                <td>In Progress</td>
                <td>Collaboration</td>
                <td>12 Aug 2024</td>
            </tr>
            <tr>
                <td>Test</td>
                <td>Test@gmail.com</td>
                <td>8976542457</td>
                <td>Data</td>
                <td>Collection</td>
                <td>In Progress</td>
                <td>Collaboration</td>
                <td>12 Aug 2024</td>
            </tr>
            <tr>
                <td>Test</td>
                <td>Test@gmail.com</td>
                <td>8976542457</td>
                <td>Data</td>
                <td>Collection</td>
                <td>In Progress</td>
                <td>Collaboration</td>
                <td>12 Aug 2024</td>
            </tr>*/}

          
        </tbody>
      </table>
      <FormModel show={show} handleClose={handleClose} />
    </div>
    </>


  )
}

export default JobView;