import React from 'react';
import moment from 'moment';
import './WorldNumber.css';

function getLastCheckedDate(date) {
  return date ? moment.utc(date).local().format('MM/DD/YYYY h:mm a') : 'Not available';
}

function WorldNumbers(props) {
  return (
    <div className="WorldNumbers">
      <div className="card">
        <div className="card-body">
          <div className="header">
            <p><i className="fa fa-globe"></i>&nbsp;Worldwide Overview</p>
            <span style={{ fontSize: '12px' }}>Statistic taken On: {getLastCheckedDate(props.data.statistic_taken_at)}</span>
          </div>
          <br />
          <div className="header">
            <div className="box">
              <span style={{ color: '#989899' }}>Confirmed</span>
              <h2 className="text-warning">{props.data.total_cases}</h2>
            </div><div className="box">
              <span style={{ color: '#989899' }}>Deaths</span>
              <h2 className="text-danger">{props.data.total_deaths}</h2>
            </div><div className="box">
              <span style={{ color: '#989899' }}>Recovered</span>
              <h2 className="text-success">{props.data.total_recovered}</h2>
            </div>
          </div>
          <br/>
          <div className="header">
            <div className="box">
              <span style={{ color: '#989899' }}>New Cases</span>
              <h2 className="text-dark">{props.data.new_cases}</h2>
            </div><div className="box">
              <span style={{ color: '#989899' }}>New Deaths</span>
              <h2 className="text-dark">{props.data.new_deaths}</h2>
            </div>
            <div className="box" style={{visibility: 'hidden'}}>
              <span style={{ color: '#989899' }}>New Deaths</span>
              <h2 className="text-danger">{props.data.new_deaths}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorldNumbers;
