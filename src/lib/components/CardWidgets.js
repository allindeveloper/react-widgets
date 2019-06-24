import React, { Component } from "react";
import ReactChartkick, { ColumnChart, PieChart } from "react-chartkick";
import Chart from "chart.js";
import PropTypes from "prop-types";
import "./style.css";
import "./cards.css";

/**
 * Class CardWidget
 * @param themeColor theme for the Card Widget.
 * @param chartBgColor the background color for the chart
 * @param renderCharts specify if you want to render a chart underneath the cards
 * @param xTitle the title of the chart on the x axis
 * @param Title the title of the chart on the y axis
 * @param messages the default message when the chart has no data
 * @param downloadable specify if you want to download the chart image
 * @param viewMoreButton the object property for the view more button
 * @param customChart specifies the custom chart component to be rendered
 */
class CardWidgets extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.renderCard = this.renderCard.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      _data: [["Sun", 32], ["Mon", 46], ["Tue", 28]],
      custom_chartData:null
    };
  }

  componentDidMount() {
    ReactChartkick.addAdapter(Chart);
    let styles = document.head.appendChild(document.createElement("style"));
    styles.innerHTML += `
    .card{background: ${this.props.themeColor} }
    .card-Chart{background:${this.props.chartBgColor}}
    `;
  }

  renderCard(themeColor, cardData, viewMoreButton) {
    let indents = [];
    let color = themeColor;
    for (let i = 0; i < cardData.length; i++) {
      let progressValue = cardData[i].progress;
      let maxWidth = progressValue;
      let caption = cardData[i].caption;
      let number = cardData[i].number;
      let _chartData = cardData[i]._chartdata;
      let _shouldShowButton = viewMoreButton;
      indents.push(
        <div className={`w3-col   w3-${color} card card-1 w3-padding`} key={i}>
          <h2 className="w3-large">{caption}</h2>
          <div>
            <p className="w3-medium">{number}</p>
          </div>
          <div className="w3-light-grey w3-tiny w3-round-large">
            <div
              id="myBar"
              ref={this.textInput}
              className={
                maxWidth >= 80
                  ? `w3-container w3-red w3-round-large`
                  : `w3-container w3-green w3-round-large`
              }
              style={{ maxWidth:`${maxWidth}%` }}
            >
              {progressValue}
            </div>
          </div>
          <br />
          <center>
            {_shouldShowButton.show === true && (
              <button
                className="w3-button btn-primary btn-small"
                onClick={() => this.updateCustomChart(_shouldShowButton.link, _chartData)}
                  // onClick={_shouldShowButton.link !== (null || undefined) ?()=>this.updateCustomChart(_shouldShowButton.link) :() => this.updateChart(_chartData) }
                style={{ textAlign: "center" }}
              >
                view more
              </button>
            )}
          </center>
        </div>
      );
    }
    return indents;
  }

  updateCustomChart(link, _chartData) {
    if( link === undefined){
     throw new Error("Redirect link not found")
    }else{
     console.log("cutom props", this.props.customChart().props)
      this.updateChart(_chartData);
    }
  }
  /**
   * Initialize Chart Rendering
   * @param themeColor Color for the chart.
   */
  renderChart(themeColor) {
    //console.log("props", this.props);
    let node = [];
    let color = themeColor;
    node.push(
      <div className={`w3-col  w3-${color} card-Chart card-1`}>
        <ColumnChart
          download={this.props.downloadable}
          data={this.state._data}
          xtitle={this.props.xTitle}
          ytitle={this.props.yTitle}
          messages={this.props.messages}
        />
      </div>
    );
    return node;
  }
  /**
   * Used to update the Chart on the DOM.
   * @param _chartData An array of chart information.
   */
  updateChart(_chartData) {
    this.setState({ _data: _chartData });
  }

  /**
   * Used to check the Custom Chart before rendering.
   * @param cardData An array of chart information.
   */
  checkCustomChart(cardData) {
    if (this.props.customChart === undefined) {
      return this.renderChart(cardData);
    } else {
      return this.props.customChart();
    }
  }

  render() {
    const { themeColor, cardData, renderCharts, viewMoreButton } = this.props;
    
    return (
       <div>
      <div className="container">
      <div className="row" style={{display:"flex",justifyContent:"center"}}>
      <div >
      
          {this.renderCard(themeColor, cardData, viewMoreButton)}
          </div>
      </div>
      </div>
        <div
          className="w3-row"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {renderCharts && this.checkCustomChart(cardData)}
        </div>
      </div>
    );
  }
}
const _data = [
  {
    caption: "Pizza",
    number: "₦ 245000",
    description: "Lunch Fees",
    progress: "29",
    _chartdata: [["Sun", 22], ["Mon", 86], ["Tue", 28], ["Wed", 38]]
  },
  {
    caption: "Burger",
    number: "₦ 66700",
    description: "Lunch Fees",
    progress: "81",
    _chartdata: [["Sun", 12], ["Mon", 46], ["Tue", 48], ["Wed", 38]]
  },
  {
    caption: "Meat Pie",
    number: "₦ 26899",
    description: "Lunch Fees",
    progress: "59",
    _chartdata: [["Sun", 52], ["Mon", 16], ["Tue", 38], ["Wed", 31]]
  },
  {
    caption: "Chips",
    number: "₦ 26899",
    description: "Lunch Fees",
    progress: "49",
    _chartdata: [["Sun", 52], ["Mon", 55], ["Tue", 38], ["Wed", 28]]
  },
  {
    caption: "Chicken",
    number: "₦ 26899",
    description: "Lunch Fees",
    progress: "89",
    _chartdata: [["Sun", 22], ["Mon", 36], ["Tue", 38], ["Wed", 18]]
  }
];

CardWidgets.defaultProps = {
  themeColor: "rgb(255,143,0)",
  chartBgColor: "white",
  cardData: _data,
  renderCharts: true,
  xTitle: "Days",
  yTitle: "Number",
  messages: { empty: "No data" },
  downloadable: false,
  viewMoreButton: { show: true, text: "MORE", link: "https://www.google.com" },
};

CardWidgets.propTypes = {
  themeColor: PropTypes.string,
  cardData: PropTypes.array,
  renderCharts: PropTypes.bool,
  xTitle: PropTypes.string.isRequired,
  yTitle: PropTypes.string.isRequired,
  messages: PropTypes.object,
  downloadable: PropTypes.bool,
  customChart:PropTypes.func
};

export default CardWidgets;
