import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../components/Promo/NewPromo.css";
import Button from "../components/Promo/Button";
import CircleSelect from '../components/UI/CircleSelect';
import RectangleSelect from '../components/UI/RectangleSelect';
import InputField from './../components/UI/InputFieldType1';
import InputField2 from './../components/UI/InputFieldType2';
import Coupon from '../components/Promo/Coupon';



class EditPromo extends Component {
  render() {
    return (
      <div className="containerPromo">
        <div className="leftPromo">
          <div className="addNewPromo">
            Favorite & Promo <Link to="/NewPromo">Edit promo</Link>
          </div>

          <Coupon/>

          <div className="aboutDisc">
            <div className="MenuNewPromo">Expire date :</div>
                        <InputField
                            type='date'
                            ph='Select start date'
                            classInput='input-product-form'
                        />
                        <InputField
                            type='date'
                            ph='Select end date'
                            classInput='input-product-form'
                        />
            <div className="MenuNewPromo">Input coupon code :</div>
            <InputField2 type='text' />
            <br />
          </div>
        </div>
      <div className="rightPromo">
          <div id="formPromo">
            <div className="dataPromo">Name : </div>
            <InputField2 type='text' />
            <div className="dataPromo">Price : </div>
            <InputField2 type='text' />
            <div className="dataPromo">Description : </div>
            <InputField2 type='text' />

            <div className="dataPromo">Input product size : </div>
             <span className='additional-info'>Click product size you want to use for this promo</span>
            <div className="productSize">
                            <CircleSelect
                                type='checkbox'
                                id='regular'
                                name='regular'
                                label='R'
                            />
                            <CircleSelect
                                type='checkbox'
                                id='large'
                                name='large'
                                label='L'
                            />
                            <CircleSelect
                                type='checkbox'
                                id='xlarge'
                                name='xlarge'
                                label='XL'
                            />
                            <CircleSelect
                                type='checkbox'
                                id='250gr'
                                name='250gr'
                                label='250gr'
                                addClass='variant-2'
                            />
                            <CircleSelect
                                type='checkbox'
                                id='300gr'
                                name='300gr'
                                label='300gr'
                                addClass='variant-2'
                            />
                            <CircleSelect
                                type='checkbox'
                                id='500gr'
                                name='500gr'
                                label='500gr'
                                addClass='variant-2'
                            />
            </div>
            <div className="dataPromo">Input delivery methods : </div>
             <span className='additional-info'>Click methods you want to use for this promo </span>
            <div className="productSize">
              <RectangleSelect
                                type='checkbox'
                                id='home-delivery'
                                name='home-delivery'
                                label='Home Delivery'
                            />
                            <RectangleSelect
                                type='checkbox'
                                id='dine-in'
                                name='dine-in'
                                label='Dine in'
                            />
                            <RectangleSelect
                                type='checkbox'
                                id='pickup'
                                name='pickup'
                                label='Pick up'
                            />
            </div>
            <div className="confirmPromo">
             <section className='set-delivery-time-section'>
                        <div className='label-create-product'>
                           Enter the discount :
                        </div>
                        <InputField
                            type='text'
                            ph='Input discount'
                        />
                        
                    </section>
                     <Button
                            variant='btn-prof-2 btn-product btn-order btn-add-product'
                            label='Save Promo'
                        />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPromo;
