import React from 'react';
import './Coupon.css';
// import couponIcon from './../../assets/images/coupon-icon1.png';
function CouponCard(props) {
    const colorArr = ['yellow', 'green', 'brown'];
    const randomColor = Math.floor(Math.random() * (3 - 0 + 0)) + 0;
    return (
        <div className={`card coupon-card ${colorArr[randomColor]}`}>
            <img
                className='coupon-icon'
                src={`${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}${props.icon}`}
                alt='coupon icon'
            />

            <div className='coupon-txt'>
                <div className='coupon-title'>{props.name}</div>
                <div className='coupon-desc'>
                    {props.desc.slice(0, 50) + '...'}
                </div>
            </div>
        </div>
    );
}

export default CouponCard;
