import React from 'react'
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

const BusinessUnitModel = ({showBuModal, handleCloseBu, onSelectBusinessItem})  => {
    const [budata, setDataBU] = useState([{}]);
    const [loadingBu, setLoadingBu] = useState(true);
    const [errorBu, setErrorBu] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const userID = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const req_token = Encrypt(accessToken, username.toLowerCase());
    console.log(req_token);



    
      //Fetch Business Unit data
      useEffect(() => {
        if (showBuModal) {  // Fetch data only when modal is shown
            setLoadingBu(true); // Set loading state when fetching starts
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
                              Id: 299,
                            },
                        }),
                    });

                    if (response.ok) {
                        const resultBu = await response.json();
                        console.log(resultBu);
                        console.log(resultBu, resultBu.Result.data);
                        const sortedData = resultBu.Result.data.sort(
                            (a, b) => new Date(b.CreatedOn) - new Date(a.CreatedOn)
                        );
                        setDataBU(sortedData);
                    } else {
                        setErrorBu('Failed to fetch data');
                    }
                } catch (error) {
                    setErrorBu('Error fetching data');
                } finally {
                    setLoadingBu(false); // Set loading state to false after fetching is done
                }
            };

            fetchData();
        }
    }, [showBuModal, req_token, userID]);

    const handleRowClick = (item) => {
      onSelectBusinessItem(item.Name); // Assuming 'Name' is the field to set in input
       
  };
  return (
    <>
     <Modal show={showBuModal} onHide={handleCloseBu}>
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title><h5>Active Business Units</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Modal content goes here */}
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Created On</th>
              </tr>
            </thead>
            <tbody>
            {budata.length > 0 ? (
              budata.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(item)}>
                <td>{item.Name}</td>
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
          <Button variant="secondary" onClick={handleCloseBu}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseBu}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BusinessUnitModel