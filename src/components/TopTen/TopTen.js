import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class TopTen extends Component {
    constructor(props) {
        super(props);

        this.generateGraph = this.generateGraph.bind(this);

        this.state = {
            topTen: [],
            chartConfig: {
                title: {
                    text: 'Top 5 Countries (Confirmed & Deaths)'
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    categories: [],
                    labels: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        enabled: false
                    }
                },
                series: [{
                    type: 'column',
                    name: 'Confirmed',
                    legendColor: '#ff6565',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: 'gray'
                        },
                        formatter: function () {
                            return this.x;
                        }
                    },
                }, {
                    type: 'spline',
                    name: 'Deaths',
                    data: [],
                    marker: {
                        lineWidth: 2,
                        fillColor: 'black'
                    }
                }]
            }
        };
    }
    generateGraph() {
        this.setState({ topTen: this.props.data.countries_stat.slice(0, 5) }, () => {
            let xCategories = this.state.topTen.map(item => item.country_name);
            let cases = this.state.topTen.map(item => parseFloat(item.cases.replace(/,/g, '')));
            let deaths = this.state.topTen.map(item => parseFloat(item.deaths.replace(/,/g, '')));
            let config = { ...this.state.chartConfig };
            config.xAxis.categories = xCategories;
            config.series[0].data = cases;
            config.series[1].data = deaths;

            this.setState({ chartConfig: config });
        });
    }
    componentDidMount() {
        if (this.props.data && this.props.data.countries_stat) {
            this.generateGraph();
        }
    }
    render() {
        return (
            <div className="TopTen">
                <div className="card">
                    <div className="card-body">
                        <div className="chart-container">
                            <ReactHighcharts config={this.state.chartConfig} ref="chart" domProps={{ style: { minHeight: '300px' } }}></ReactHighcharts>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopTen;