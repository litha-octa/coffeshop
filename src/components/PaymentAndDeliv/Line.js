import React, { Component } from "react";
import "./PaymentAndDeliv.css";
import linePandD from './../../assets/images/linePandD.png';

class Line extends Component {
  render() {
    return (

    	<div className="line"><img src={linePandD} alt=""/></div>
    	);
  }
}

export default Line;
