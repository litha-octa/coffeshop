import React, { Component } from "react";
import "./Coupon.css";
import Spagetti from './../../assets/images/spagetti.png';
import lineStrip from './../../assets/images/lineStrip.png';


class Coupon extends Component {
  render() {
    return (

    		<div className="BannerCoupon">
    		<img src={Spagetti} alt="menu" className="CouMenuPic"/>
    		<div className="CouMenuName">Beef Spaghetti</div>
    		<div className="CouMenuName">20% OFF</div>
    		<div className="CouMenuDes">Buy 1 Choco Oreo and get 20% off for Beef Spaghetti</div>
    		<img src={lineStrip} alt="" className="lineCou"/>
    		<div className="CouCode">COUPON CODE</div>
    		<div className="CouMenuName">FNPR15RG</div>
    		<div className="CouValid">Valid untill October 10th 2020</div>



    		</div>
    	 );
  }
}

export default Coupon;