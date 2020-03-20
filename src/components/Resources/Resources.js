import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import testCenters from './../../assets/images/test-centres.jpg';
import cdcLogo from './../../assets/images/CDC-Logo.jpg';

function validateResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class Resources extends Component {
    constructor(props) {
        super(props);

        this.getMaskImage = this.getMaskImage.bind(this);

        this.state = {
            loading: false,
            headers: {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "90772c5ffdmsh2f31f2ac14cb241p120a92jsn0d0789b9fefc"
            },
            maskImage: null,
            maskImageError: null
        };
    }
    getMaskImage() {
        this.setState({ loading: true });
        fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/masks.php`, {
            method: 'GET',
            headers: this.state.headers
        })
            .then(validateResponse)
            .then(response => response.blob())
            .then(blob => {
                this.setState({ maskImage: URL.createObjectURL(blob), loading: false })
            });
    }
    componentDidMount() {
        this.getMaskImage();
    }
    render() {
        if (!this.state.loading) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <img src={this.state.maskImage} style={{ height: '400px', width: '100%' }} alt="mask_instructions" />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <div className="card" style={{ paddingLeft: '20px', height: '400px', overflow: 'auto' }}>
                                                <br />
                                                <h1>Where to get COVID-19 test?</h1>
                                                <p>Enter your zip code to find out the nearest COVID-19 test site.</p>
                                                <a className="btn btn-link" href="https://findahealthcenter.hrsa.gov" target="_blank"><h3>Find a center</h3></a>
                                                <div style={{ width: '100%', textAlign: 'center' }}>
                                                    <img src={testCenters} alt="test centers logo" style={{ height: '100px', width: '50%' }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <div className="card" style={{ paddingLeft: '20px', height: '400px', overflow: 'auto' }}>
                                                <br />
                                                <h1>Coronavirus (COVID-19)</h1>
                                                <p>Information from CDC</p>
                                                <a className="btn btn-link" href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" target="_blank"><h3>Covid-19 CDC</h3></a>
                                                <div style={{ width: '100%', textAlign: 'center' }}>
                                                    <img src={cdcLogo} alt="test centers logo" style={{ height: '100px', width: '50%' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Dashboard-loader">
                    <h4>Loading...</h4>
                </div>
            );
        }
    }
}

export default Resources;