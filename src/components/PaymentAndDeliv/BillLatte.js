import React, { Component } from "react";
import "./PaymentAndDeliv.css";


class BillLatte extends Component {
  render() {
    return (

    <div className="bill-MenuDesc">
		<img src="assets/latte.png" alt="latte" className="bill-MenuPic"/>
				
		<div className="bill-MenuName">
			Hazelnut Latte<br/>x 1<br/>Regular
		</div>
		<div className="bill-MenuPrice">
			IDR 24.0
		</div>
	</div>
        );
  }
}

export default BillLatte;


