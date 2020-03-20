import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

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
                                        <div className="col-md-4">
                                            <img src={this.state.maskImage} style={{ height: '400px', width: '400px' }} />
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