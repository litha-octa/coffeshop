import React from 'react';
import { useHistory } from 'react-router-dom';
import './Product.css';
import './ProductDetail.css';
function ProductCard(props) {
    const history = useHistory();
    const onClickHandler = () => {
        history.push('/product/detail/' + props.id);
    };
    return (
        <div className='card product-card' onClick={onClickHandler}>
            <img
                src={`${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}${props.icon}`}
                className='product-icon'
                alt='product icon'
            />
            {props.discount && (
                <span className='product-discount'>{props.discount}%</span>
            )}
            <div className='product-txt'>
                <div className='product-name'>
                    {props.name.length > 20
                        ? props.name.slice(0, 16) + ' ...'
                        : props.name}
                </div>
                <div className='product-price'>IDR {props.price}</div>
            </div>
        </div>
    );
}

export default ProductCard;
