import React, { Component } from "react";
import "./ManageOrderAdm.css";


class CardPayMethod extends Component {
  render() {
    return (
<>
    												<div className="order-wrap">
														<div> <input type="radio" className="radioSelect"/></div>
														<img src="assets/card.png" className="Order-payIcon" id="icon-card" alt=""/>
														<div className='Orderpay-Method'>Card</div>
													</div>
													<div className="order-wrap">
														<div> <input type="radio" className="radioSelect"/></div>
														<img src="assets/bank.png" className="Order-payIcon" id="icon-bank" alt=""/>
														<div className='Orderpay-Method'>Bank account</div>
													</div>
													<div className="order-wrap">
														<div> <input type="radio" className="radioSelect"/></div>
														<img src="assets/cod.png" className="Order-payIcon" id="icon-cod" alt=""/>
														<div className='Orderpay-Method'>Cash on delivery</div>
													</div>

</>
    	);
  }
}

export default CardPayMethod;
