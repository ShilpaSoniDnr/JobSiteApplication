import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import './JobView.css';
import { useState, useEffect } from 'react'
import { Encrypt } from './TokenEncryptor.mjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function InterviewModel({showInterviewModal, handleCloseInterview, onSelectInterviewItem}) {
    const [Interviewdata, setDataInterview] = useState([{}]);
    const [loadingInterview, setLoadingInterview] = useState(true);
    const [errorInterview, setErrorInterview] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const req_token = Encrypt(accessToken, username.toLowerCase());
    

    //Fetch Interview data
    useEffect(() => {
        if (showInterviewModal) {  // Fetch data only when modal is shown
            setLoadingInterview(true); // Set loading state when fetching starts
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:3000/getbussinessData', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            //'Authorization': `Bearer ${req_token}`
                        },
                        body: JSON.stringify({
                            Token: req_token,
                            UserID: parseInt(userID, 10),
                            db_Obj: {
                              Id: 64,
                            },
                        }),
                    });

                    if (response.ok) {
                        const resultInterview = await response.json();
                        console.log(resultInterview);
                        console.log(resultInterview, resultInterview.Result.data);
                        
                        setDataInterview(resultInterview.Result.data);
                    } else {
                        setErrorInterview('Failed to fetch data');
                    }
                } catch (error) {
                    setErrorInterview('Error fetching data');
                } finally {
                    setLoadingInterview(false); // Set loading state to false after fetching is done
                }
            };

            fetchData();
        }
    }, [showInterviewModal, req_token, userID]);
    const handleInterviewClick = (item) => {
        onSelectInterviewItem(item.DisplayName); // Assuming 'Name' is the field to set in input
         
    };
    
   
  return (
    <>
    <Modal show={showInterviewModal} onHide={handleCloseInterview}>
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title><h5>Users</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Modal content goes here */}
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
            {Interviewdata.length > 0 ? (
              Interviewdata.map((item, index) => (
              <tr key={index} onClick={() => handleInterviewClick(item)}>
                <td>{item.DisplayName}</td>
                <td>{item.uEmail}</td>
              </tr>
             ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )}
            {/*<tr>
                <td>Test</td>
                <td>12 Aug 2024</td>
              </tr>
              <tr>
                <td>Test</td>
                <td>12 Aug 2024</td>
              </tr>
              <tr>
                <td>Test</td>
                <td>12 Aug 2024</td>
              </tr>
              <tr>
                <td>Test</td>
                <td>12 Aug 2024</td>
              </tr>
              <tr>
                <td>Test</td>
                <td>12 Aug 2024</td>
              </tr>*/}


            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInterview}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseInterview}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default InterviewModel