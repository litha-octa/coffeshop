import React from 'react';
import Chart from 'chart.js/auto';
import './Dashboard.css';
import './circle.css'
import datePic from "../../assets/images/date-settings.png";
import arrowLeft from "../../assets/images/arrow-left.png";
import arrowRight from "../../assets/images/arrow-right.png";
import more from "../../assets/images/more.png"
import cherynPic from "../../assets/images/cheryn-pic.png"

// Data generation
function getRandomArray(numItems) {
    // Create random array of objects
    let names = ['15', '16','17', '18','19', '20'];
    let data = [];
    for(var i = 0; i < numItems; i++) {
      data.push({
        label: names[i],
        value: Math.round(200000 + 5000000 * Math.random())
      });
    }
    console.log(data)
    return data;
  }
  
  function getRandomDateArray(numItems) {
    // Create random array of objects (with date)
    let data = [];
    let baseTime = new Date('2018-05-01T00:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for(var i = 0; i < numItems; i++) {
      data.push({
        time: new Date(baseTime + i * dayMs),
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }
  
  function getData() {
    let data = [];
    data.push({
        title: 'Visits',
        data: getRandomDateArray(150)
      });

    data.push({
      title: 'Income',
      data: getRandomArray(6)
    });

    return data;
  }
  
  
  // BarChart
  class BarChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.myChart.data.labels = this.props.data.map(d => d.label);
      this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.myChart.update();
    }
  
    componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'bar',
        options: {
            maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 100
                }
              }
            ]
          }
        },
        data: {
          labels: this.props.data.map(d => d.label),
          datasets: [{
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            backgroundColor: this.props.color
          }]
        }
      });
    }
  
    render() {
      return (
          <canvas ref={this.canvasRef} />
      );
    }
  }

  // App
class Income extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        data: getData()
      };
    }
  
  

    render() {
      return (
        <div className="dashboard-container">
            <div className="text-header"> See how your store progress so far </div>
            <div className="date-header">
                <img src={datePic} className="date-pic" alt=""/>
                <div className="text-header-1">15 April - 21 April 2020</div>
                <img src={arrowLeft} alt="" />
                <img id="arrow" src={arrowRight} alt="" />
            </div>
            <div className="card-content-container">
            <div className="report-card">
                <div className="text-report">Monthly Report <img src={more} className="more-pic" alt="" /></div>
                <div className="text-date">15 April - 20 April</div>
                    <div className="sub chart-wrapper">
                    <BarChart
                    data={this.state.data[1].data}
                    title={this.state.data[1].title}
                    color="#FFBA33"
                    />
                </div>
            </div>
            <div className="profile-card">
              <div className="container">
                <div className="profile-admin">
                <img src={cherynPic} alt="profile-pic" className="admin-pic"></img>
                <div className="name-container">
                  <div className="admin-name">Cheryn Laurent</div>
                  <div className="admin-message">Keep up the good work and spread love!</div>
                </div>
                </div>
                <hr id="profile-line"/>
                <div className="best-staff">
                  <div className="sub-name">Best Staff of the Month</div>
                  <div className="percentage">
                    <div class="c100 p80 small green">
                      <span>80%</span>
                      <div class="slice">
                          <div class="bar"></div>
                          <div class="fill"></div>
                      </div>
                    </div>
                  </div>
                  <div className="sub-message">Achieved 3.5M of total 5M <br/> 478 Customer</div>
                </div>
              </div>

              <div className="container mt-4"> 
              <div className="best-staff">
                  <div className="sub-name">Goals</div>
                  <div className="percentage">
                    <div class="c100 p76 orange">
                      <span>76%</span>
                      <div class="slice">
                          <div class="bar"></div>
                          <div class="fill"></div>
                      </div>
                    </div>
                  </div>
                  <div className="sub-message"></div>
                </div>
              </div>   
            </div>
            </div>
            <div className="button-container">
                <div type="button" className="download-report">
                  Download Report
                </div>
                <div type="button" className="share-report">
                  Share Report
                </div>
            </div>
        </div>
      );
    }
  }

  export default Income

  