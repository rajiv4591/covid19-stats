import React, { Component } from 'react';
import './../Map/Map.css';

class Map extends Component {
    constructor(props) {
        super(props);

        this.generateMap = this.generateMap.bind(this);

        this.state = {

        };
    }
    generateMap() {
        let that = this;
        /**
         * ---------------------------------------
         * This demo was created using amCharts 4.
         * 
         * For more information visit:
         * https://www.amcharts.com/
         * 
         * Documentation is available at:
         * https://www.amcharts.com/docs/v4/
         * ---------------------------------------
         */

        // Themes begin
        window.am4core.useTheme(window.am4themes_animated);
        // Themes end

        /* Create map instance */
        var chart = window.am4core.create("chartdiv", window.am4maps.MapChart);

        /* Set map definition */
        chart.geodata = window.am4geodata_worldLow;

        /* Set projection */
        chart.projection = new window.am4maps.projections.Miller();

        /* Create map polygon series */
        var polygonSeries = chart.series.push(new window.am4maps.MapPolygonSeries());

        /* Make map load polygon (like country names) data from GeoJSON */
        polygonSeries.useGeodata = true;

        /* Configure series */
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.applyOnClones = true;
        polygonTemplate.togglable = true;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeOpacity = 0.5;
        polygonTemplate.fill = chart.colors.getIndex(0);
        var lastSelected;
        polygonTemplate.events.on("hit", function (ev) {
            if (lastSelected) {
                // This line serves multiple purposes:
                // 1. Clicking a country twice actually de-activates, the line below
                //    de-activates it in advance, so the toggle then re-activates, making it
                //    appear as if it was never de-activated to begin with.
                // 2. Previously activated countries should be de-activated.
                lastSelected.isActive = false;
            }
            // ev.target.series.chart.zoomToMapObject(ev.target);
            if(that.props.onCountryClick) that.props.onCountryClick(ev.target.dataItem.dataContext.name);
            else ev.target.series.chart.zoomToMapObject(ev.target);
            if (lastSelected !== ev.target) {
                lastSelected = ev.target;
            }
        })


        /* Create selected and hover states and set alternative fill color */
        var ss = polygonTemplate.states.create("active");
        ss.properties.fill = chart.colors.getIndex(2);

        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(4);

        // Hide Antarctica
        polygonSeries.exclude = ["AQ"];

        // Small map
        chart.smallMap = new window.am4maps.SmallMap();
        // Re-position to top right (it defaults to bottom left)
        chart.smallMap.align = "right";
        chart.smallMap.valign = "top";
        chart.smallMap.series.push(polygonSeries);

        // Zoom control
        chart.zoomControl = new window.am4maps.ZoomControl();

        chart.events.on("ready", function (ev) {
            chart.zoomToMapObject(polygonSeries.getPolygonById(that.props.country || 'US'));
        });

        var homeButton = new window.am4core.Button();
        homeButton.events.on("hit", function () {
            chart.goHome();
        });

        homeButton.icon = new window.am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = chart.zoomControl;
        homeButton.insertBefore(chart.zoomControl.plusButton);
    }
    componentDidMount() {
        this.generateMap();
    }
    componentWillReceiveProps(newProps) {
        if(this.props.country !== newProps.country) {
            this.generateMap();
        }
    }
    render() {
        return (
            <div className="Map">
                <div id="chartdiv"></div>
            </div>
        );
    }
}

export default Map;