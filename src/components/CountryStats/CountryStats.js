import React, { useState } from 'react';
import './CountryStats.css';

function getTotalCases(props, label, selectedProvince) {
  console.log(selectedProvince);
  let country = [];
  let total = 0;
  if (props.data && props.data.data && props.data.data.covid19Stats) {
    country = props.data.data.covid19Stats.filter((item) => {
      return item.country && props.country ? item.country.toLowerCase() === props.country.toLowerCase() : false;
    });
  }

  country.forEach((item) => {
    if(selectedProvince && selectedProvince !== 'All') total += item.province === selectedProvince ? item[label] : 0;
    else if(selectedProvince && selectedProvince === 'All') total += item[label];
  });

  return total;
}

function getProvinceList(props, setSelectedProvince, selectedProvince) {
  let country = [];
  let provinces = ['All'];

  if (props.data && props.data.data && props.data.data.covid19Stats) {
    country = props.data.data.covid19Stats.filter((item) => {
      return item.country && props.country ? item.country.toLowerCase() === props.country.toLowerCase() : false;
    });
  }

  if (country.length > 1) {
    country.forEach((item) => {
      provinces.push(item.province);
    });
  }

  if(provinces.indexOf(selectedProvince) < 0) {
    setSelectedProvince('All');
  }

  return provinces.sort();
}

function CountryStats(props) {
  const [selectedProvince, setSelectedProvince] = useState('All');
  React.useEffect(() => {
    setSelectedProvince('All');
  }, ['All']);
  return (
    <div className="CountryStats">
      <div className="container">
        {
          getProvinceList(props, setSelectedProvince, selectedProvince).length > 1
            ?
            <div style={{ marginBottom: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <span>Province:</span>
              <div className="dropdown">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                  {selectedProvince || 'Select Province'}
                </button>
                <div className="dropdown-menu" style={{ height: '400px', overflow: 'auto' }}>
                  {
                    getProvinceList(props, setSelectedProvince, selectedProvince).map((item) => {
                      return (
                        <a className="dropdown-item" key={item} onClick={() => setSelectedProvince(item)} style={{ cursor: 'pointer' }}>{item}</a>
                      );
                    })
                  }
                </div>
              </div>
            </div>
            :
            null
        }
        <div className="box">
          <span style={{ color: '#989899' }}>Confirmed</span>
          <h2 className="text-warning">{getTotalCases(props, 'confirmed', selectedProvince)}</h2>
        </div>
        <div className="box">
          <span style={{ color: '#989899' }}>Deaths</span>
          <h2 className="text-danger">{getTotalCases(props, 'deaths', selectedProvince)}</h2>
        </div>
        <div className="box">
          <span style={{ color: '#989899' }}>Recovered</span>
          <h2 className="text-success">{getTotalCases(props, 'recovered', selectedProvince)}</h2>
        </div>
      </div>
    </div>
  );
}

export default CountryStats;
