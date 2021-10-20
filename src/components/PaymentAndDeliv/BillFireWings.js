import React, { Component } from "react";
import "./PaymentAndDeliv.css";


class BillFireWings extends Component {
  render() {
    return (

    <div  className="bill-MenuDesc">
		<img src="assets/chicken.png" alt="chicken" className="bill-MenuPic"/>
				
		<div className="bill-MenuName">
			Chicken Fire<br/>Wings<br/>x 2
		</div>
		<div className="bill-MenuPrice">
			IDR 30.0
		</div>
	</div>
        );
  }
}

export default BillFireWings;


