import React, { Component } from "react";
import "./PaymentAndDeliv.css";


class BankPayMethod extends Component {
  render() {
    return (

    												<div className="adrs-wrap">
														<div> <input type="radio"/></div>
														<img src="assets/bank.png" className="payIcon" id="icon-bank" alt=""/>
														<div className='pay-Method'>Bank account</div>
													</div>


    	);
  }
}

export default BankPayMethod;
