import React, { Component } from "react";
import "./PaymentAndDeliv.css";


class CODPayMethod extends Component {
  render() {
    return (

    												<div className="adrs-wrap">
														<div> <input type="radio"/></div>
														<img src="assets/cod.png" className="payIcon" id="icon-cod" alt=""/>
														<div className='pay-Method'>Cash on delivery</div>
													</div>


    	);
  }
}

export default CODPayMethod;
