import React from 'react';
import Breadcrumb from '../components/UI/Breadcrumb';
import Button from './../components/UI/Button';
import RectangleSelect from '../components/UI/RectangleSelect';
import CircleSelect from '../components/UI/CircleSelect';
import InputField from './../components/UI/InputFieldType1';
import blankPhoto from '../assets/images/blank-avatar.png';
function NewPromo() {
    const currentStuff = {
        category: 'Favorite & Promo',
        action: 'Add new promo',
    };
    return (
        <div className='product-edit-container product-add-container container-fluid'>
            <Breadcrumb
                item1={currentStuff.category}
                item2={currentStuff.action}
            />

            <main className='row'>
                <aside className='col col-5 left-side'>
                    <section className='add-image-section'>
                        <div className='image-placeholder'>
                            <img
                                src={blankPhoto}
                                alt='ava placeholder'
                                className='add-product-icon'
                            />
                        </div>
                        <Button
                            variant='btn-prof-4 btn-product btn-order btn-add-product'
                            label='Take a picture'
                        />
                        <Button
                            variant='btn-prof-1 btn-product btn-order btn-add-product'
                            label='Choose form gallery'
                        />
                    </section>
                    <section className='set-delivery-time-section'>
                        <div className='label-create-product'>
                           Enter the discount :
                        </div>
                        <InputField
                            type='text'
                            ph='Input discount'
                            classInput='input-product-form'
                        />
                        
                    </section>
                    <section className='input-stock-section'>
                        <div className='label-create-product'>Expire date :</div>
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
                    </section>
                    <section className='set-delivery-time-section'>
                        <div className='label-create-product'>
                           Input coupon code :
                        </div>
                        <InputField
                            type='text'
                            ph='Input stock'
                            classInput='input-product-form'
                        />
                        
                    </section>
                </aside>
                <aside className='col col right-side'>
                    <section className='info-section'>
                        <InputField
                            label='Name:'
                            type='text'
                            ph='Type product name min. 50 characters '
                            classLabel='label-create-product'
                            classInput='input-product-form'
                        />
                        <InputField
                            label='Price:'
                            type='number'
                            ph='Type the price'
                            classLabel='label-create-product'
                            classInput='input-product-form'
                        />
                        <InputField
                            label='Description:'
                            type='text'
                            ph='Describe your product min. 50 characters '
                            classLabel='label-create-product'
                            classInput='input-product-form'
                        />
                    </section>
                    
                    <section className='select-product-size-section'>
                        <div className='label-create-product'>
                            Input product size
                        </div>
                        <span className='additional-info'>
                            Click size you want to use for this product
                        </span>
                        <div className='check-section'>
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
                    </section>
                    <section className='select-delivery-method-section'>
                        <div className='label-create-product'>
                            Input delivery method
                        </div>
                        <span className='additional-info'>
                            Click methods you want to use for this product
                        </span>
                        <div className='check-section'>
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
                    </section>
                    <section className='confirm-button-section'>
                        <Button
                            variant='btn-prof-2 btn-product btn-order btn-add-product'
                            label='Save Promo'
                        />
                        <Button
                            variant='btn-prof-5 btn-product btn-order btn-add-product'
                            label='Cancel'
                        />
                    </section>
                </aside>
            </main>
        </div>
    );
}

export default NewPromo;
