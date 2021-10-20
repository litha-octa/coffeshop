import React, { Component } from "react";
import "./ManageOrderAdm.css";


class BillFireWingsAdm extends Component {
  render() {
    return (

    <div  className="Order-MenuDesc">
		<img src="assets/chicken.png" alt="chicken" className="Order-MenuPic"/>
				
		<div className="Order-MenuName">
			Chicken Fire<br/>Wings<br/>x 2
		</div>
		<div className="Order-MenuPrice">
			IDR 30.0
		</div>
	</div>
        );
  }
}

export default BillFireWingsAdm;


