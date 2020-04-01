import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Dashboard.css';
import WorldNumbers from './../WorldNumbers/WorldNumbers';
import TopTen from './../TopTen/TopTen';
import News from './../News/News';
import Map from './../Map/Map';
import CountryStats from './../CountryStats/CountryStats';
import { getCountryCodes } from './../../assets/countryCodes';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.fetchOverviewData = this.fetchOverviewData.bind(this);
        this.fetchDataByCountry = this.fetchDataByCountry.bind(this);
        this.fetchWorldNews = this.fetchWorldNews.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onCountryClick = this.onCountryClick.bind(this);

        this.state = {
            loading: false,
            covidOverviewData: null,
            covidOverviewFetchError: false,
            topTenData: null,
            topTenDataError: null,
            worldNewsData: null,
            worldNewsError: null,
            newsCountry: 'US',
            mapCountryCode: 'US',
            allCountriesData: null,
            allCountriesDataError: null,
            countriesList: [],
            headers: {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "90772c5ffdmsh2f31f2ac14cb241p120a92jsn0d0789b9fefc"
            },
            countryHeaders: {
                "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                "x-rapidapi-key": "90772c5ffdmsh2f31f2ac14cb241p120a92jsn0d0789b9fefc"
            }
        };
    }
    fetchOverviewData() {
        this.setState({ loading: true });
        axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php', { 'headers': this.state.headers })
            .then((response) => {
                this.setState({ covidOverviewData: response.data, loading: false });
            }).catch((error) => {
                this.setState({ covidOverviewFetchError: true });
            });
    }
    fetchDataByCountry() {
        this.setState({ loading: true });
        axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', { 'headers': this.state.headers })
            .then((response) => {
                console.log(response.data);
                this.setState({ topTenData: response.data, loading: false });
            }).catch((error) => {
                this.setState({ topTenDataError: true });
            });
    }
    fetchWorldNews() {
        let stringSearch = 'corona virus ' + this.state.newsCountry + '&';
        var url = 'https://newsapi.org/v2/everything?' +
            'q=' + stringSearch +
            'from=' + moment().format('YYYY-MM-DD') + '&' +
            'sortBy=popularity&' +
            'apiKey=550a14d8b39747c2ace275e9132dfbbc';

        axios.get(url)
            .then((response) => {
                this.setState({ worldNewsData: response.data, loading: false });
            }).catch((error) => {
                this.setState({ worldNewsError: true });
            });
    }
    fetchAllCountryDetails() {
        this.setState({ loading: true });
        axios.get('https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats', { 'headers': this.state.countryHeaders })
            .then((response) => {
                let countriesList = [];
                if (response.data && response.data.data && response.data.data.covid19Stats) {
                    response.data.data.covid19Stats.forEach((item) => {
                        if (countriesList.indexOf(item.country) < 0) {
                            countriesList.push(item.country);
                        }
                    });
                }
                this.setState({ allCountriesData: response.data, loading: false, countriesList: countriesList.sort() });
            }).catch((error) => {
                this.setState({ allCountriesDataError: true });
            });
    }
    onCountryChange(country) {
        const countryCodes = getCountryCodes();
        this.setState({ newsCountry: country }, () => {
            this.fetchWorldNews();
        });
        for (let key in countryCodes) {
            if (key === 'US' && country === 'US') {
                this.setState({ mapCountryCode: key });
            }
            if (countryCodes[key] === country) {
                this.setState({ mapCountryCode: key });
            }
        }
    }
    componentWillMount() {
        this.fetchOverviewData();
        this.fetchDataByCountry();
        this.fetchWorldNews();
        this.fetchAllCountryDetails();
    }
    onCountryClick(country) {
        if(country === 'United States') country = 'US';
        this.onCountryChange(country);
    }
    render() {
        if (!this.state.loading && this.state.covidOverviewData && this.state.topTenData) {
            return (
                <div className="Dashboard container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-7 col-xl-7">
                            <WorldNumbers data={this.state.covidOverviewData} />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-5 col-xl-5">
                            <TopTen data={this.state.topTenData} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card" style={{ minHeight: '500px' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                        </div>
                                        <div className="col-md-6">
                                            {/* <h3>{this.state.newsCountry}</h3> */}
                                            Country:
                                            <div className="dropdown">
                                                <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                                    {this.state.newsCountry || 'Select Country'}
                                                </button>
                                                <div className="dropdown-menu" style={{ height: '400px', overflow: 'auto' }}>
                                                    {
                                                        this.state.countriesList.map((item) => {
                                                            return (
                                                                <a className="dropdown-item" key={item} onClick={() => { this.onCountryChange(item); }} style={{ cursor: 'pointer' }}>{item}</a>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <hr />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-4 col-xl-4">
                                            <p><i className="fa fa-newspaper-o"></i>&nbsp;News Articles</p>
                                            {
                                                this.state.worldNewsData
                                                    ?
                                                    <News data={this.state.worldNewsData} />
                                                    :
                                                    this.state.worldNewsError
                                                        ?
                                                        <p className="text-danger">There was an error fetching news articles</p>
                                                        :
                                                        null
                                            }
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-2 col-xl-2">
                                            <CountryStats data={this.state.allCountriesData} country={this.state.newsCountry} />
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
                                            <Map country={this.state.mapCountryCode} onCountryClick={this.onCountryClick} />
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

export default Dashboard;