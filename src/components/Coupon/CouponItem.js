import React, { useState, useEffect } from 'react';
import './Coupon.css';
import CouponCard from './CouponCard';
import axios from 'axios';

function CouponItem() {
    const BASE_URL = `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}`;

    const [promoToday, setPromoToday] = useState();
    let promoItem;
    useEffect(() => {
        axios
            .get(`${BASE_URL}/promo`)
            .then((res) => {
                setPromoToday(res.data.data.result);
                // console.log(res.data.data.result);
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (promoToday) {
        promoItem = promoToday.map((item) => {
            return (
                <CouponCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    desc={item.description}
                    icon={item.product_picture}
                />
            );
        });
    }
    return <>{promoItem}</>;
}

export default CouponItem;
