import React, { Component } from 'react';
import './History.css';

class Menu2 extends Component {
    render() {
        return (
            <div className='HistoryMenu'>
                <img
                    src='assets/menuHis.png'
                    className='MenuPic'
                    alt='menu icon'
                />
                <div className='MenuName'>Veggie tomato mix</div>
                <div className='price-Menu'>IDR 34.000</div>
                <input type='checkbox' className='checkboxMenu' />
                <div className='status-Menu'>Delivered to Table 4</div>
            </div>
        );
    }
}

export default Menu2;
