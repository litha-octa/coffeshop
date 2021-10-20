import React, { Component } from "react";
import "./ManageOrderAdm.css";


class BillLatte extends Component {
  render() {
    return (

    <div className="Order-MenuDesc">
		<img src="assets/latte.png" alt="latte" className="Order-MenuPic"/>
				
		<div className="Order-MenuName">
			Hazelnut Latte<br/>x 1<br/>Regular
		</div>
		<div className="Order-MenuPrice">
			IDR 24.0
		</div>
	</div>
        );
  }
}

export default BillLatte;


