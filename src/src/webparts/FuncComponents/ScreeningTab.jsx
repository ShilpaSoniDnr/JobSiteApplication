import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './JobView.css'

function ScreeningTab() {
  return (
    <>
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <div className="process-bar">
            <div className="step">
              <div className="step-content">
                <span>Screening</span>
              </div>
            </div>
            <div className="step">
              <div className="step-content">
                <span>First Interview</span>
              </div>
            </div>
            <div className="step">
              <div className="step-content">
                <span>Machine Test</span>
              </div>
            </div>
            <div className="step">
              <div className="step-content">
                <span>Final Interview</span>
              </div>
            </div>
            <div className="step">
              <div className="step-content">
                <span>HR Round</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default ScreeningTab