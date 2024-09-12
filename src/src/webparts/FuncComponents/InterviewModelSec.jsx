import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import './JobView.css';
import { useState, useEffect } from 'react'
import { Encrypt } from './TokenEncryptor.mjs';//user Id and Password token algorithm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function InterviewModelSec({showInterviewSecModal, handleCloseInterviewSec , onSelectInterviewSecItem}) {
    const [InterviewSecdata, setDataInterviewSec] = useState([{}]);
    const [loadingInterviewSec, setLoadingInterviewSec] = useState(true);
    const [errorInterviewSec, setErrorInterviewSec] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const req_token = Encrypt(accessToken, username.toLowerCase());
    

    useEffect(() => {
        if (showInterviewSecModal) {  // Fetch data only when modal is shown
            setLoadingInterviewSec(true); // Set loading state when fetching starts
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
                        const resultInterviewSec = await response.json();
                        console.log(resultInterviewSec);
                        console.log(resultInterviewSec, resultInterviewSec.Result.data);
                        
                        setDataInterviewSec(resultInterviewSec.Result.data);
                    } else {
                        setErrorInterviewSec('Failed to fetch data');
                    }
                } catch (error) {
                    setErrorInterviewSec('Error fetching data');
                } finally {
                    setLoadingInterviewSec(false); // Set loading state to false after fetching is done
                }
            };

            fetchData();
        }
    }, [showInterviewSecModal, req_token, userID]);

    const handleInterviewSecClick = (item) => {
        onSelectInterviewSecItem(item.DisplayName, item.DT_RowId); // Assuming 'Name' is the field to set in input
         
    };
  return (
    <>
    <Modal show={showInterviewSecModal} onHide={handleCloseInterviewSec}>
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
            {InterviewSecdata.length > 0 ? (
              InterviewSecdata.map((item, index) => (
              <tr key={index} onClick={() => handleInterviewSecClick(item)}>
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
          <Button variant="secondary" onClick={handleCloseInterviewSec}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseInterviewSec}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default InterviewModelSec