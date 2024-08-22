import * as React from 'react';
import styles from './XTimesheet.module.scss';
import type { IXTimesheetProps } from './IXTimesheetProps';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import JobView from '../../FuncComponents/JobView';
import Login from '../../FuncComponents/Login'




export default class XTimesheet extends React.Component<IXTimesheetProps, {}> {
  public render(): React.ReactElement<IXTimesheetProps> {
    const {
     
      hasTeamsContext,
 
    } = this.props;

    return (
      <section className={`${styles.xTimesheet} ${hasTeamsContext ? styles.teams : ''}`}>
        <Router>
          <Routes>
            {/* Default route to show Login */}
            <Route path="/" element={<Login />} />
            {/* Protected route that redirects to JobView after login */}
            <Route path="/jobview" element={<JobView />} />
            {/* Catch-all route to redirect to login if the path is unknown */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>

      </section>
    );
  }
}
