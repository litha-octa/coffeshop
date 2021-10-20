import React, { Component } from "react";
import "./PaymentAndDeliv.css";


class CardPayMethod extends Component {
  render() {
    return (
<>
    												<div className="adrs-wrap">
														<div className="spaceMeth"> <input type="radio"/></div>
														<img src="assets/card.png" className="payIcon" id="icon-card" alt=""/>
														<div className='pay-Method'>Card</div>
													</div>
													<div className="adrs-wrap">
														<div> <input type="radio"/></div>
														<img src="assets/bank.png" className="payIcon" id="icon-bank" alt=""/>
														<div className='pay-Method'>Bank account</div>
													</div>
													<div className="adrs-wrap">
														<div> <input type="radio"/></div>
														<img src="assets/cod.png" className="payIcon" id="icon-cod" alt=""/>
														<div className='pay-Method'>Cash on delivery</div>
													</div>

</>
    	);
  }
}

export default CardPayMethod;
