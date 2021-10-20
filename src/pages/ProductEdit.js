import React, { useState, useEffect, useRef } from 'react';

import '../components/Product/ProductEdit.css';
import Breadcrumb from '../components/UI/Breadcrumb';
import blankPhoto from '../assets/images/blank-avatar.png';
import InputField from '../components/UI/InputFieldType2';
import Dropdown from '../components/UI/Dropdown';
import NumericInput from 'react-numeric-input';
import Button from './../components/UI/Button';
import iconDelete from '../assets/images/trash-icon2.png';
import Modal from '../components/UI/Modal';

import { connect } from 'react-redux';

import axios from 'axios';
import { useParams, useHistory } from 'react-router';

function ProductEdit(props) {
    const { id } = useParams();
    const history = useHistory();
    const BASE_URL = `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}`;
    const [modalShow, setModalShow] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalConfirm, setModalConfirm] = useState({ function: '' });

    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');

    const [productDetail, setProductDetail] = useState();
    const [productSize, setProductSize] = useState();

    const [selectedSize, setSelectedSize] = useState(1);
    const [productPrice, setProductPrice] = useState(0);
    const [productStock, setProductStock] = useState(0);
    // let availableSize;

    const [deliveryMethod, setDeliveryMethod] = useState(0);
    // const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(0);
    // let availableMethod;
    // fake data for test
    const currentStuff = {
        category: 'Favorite & Promo',
        product: 'Cold Brew',
        action: 'Edit product',
    };

    const size = [
        { id: 1, name: 'Regular' },
        { id: 2, name: 'Large' },
        { id: 3, name: 'Extra Large' },
        { id: 4, name: '250 gram' },
        { id: 5, name: '300 gram' },
        { id: 6, name: '500 gram' },
    ];
    const deliveryMethod2 = [
        { id: 1, name: 'Dine in' },
        { id: 2, name: 'Home Delivery' },
        { id: 3, name: 'Take Away' },
    ];
    console.log(productSize);

    // const [num, setNum] = useState(1);
    // console.log(num);
    const deleteHandler = () => {
        axios
            .delete(`${BASE_URL}/products/${id}`, {
                headers: {
                    'auth-token': props.token,
                },
            })
            .then((res) => {
                history.goBack();
                // console.log(res.data.data);
            })
            .catch((err) => console.log(err));
        setModalShow(false);
    };
    const deletePhotoHandler = () => {
        let formData = new FormData();
        formData.append('product_picture', null);
        axios
            .patch(`${BASE_URL}/products/${id}`, formData, {
                headers: {
                    'auth-token': props.token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                history.go(0);
                // console.log(res.data.data);
            })
            .catch((err) => console.log(err));
        setModalShow(false);
    };
    const uploadImage = useRef(null);

    const uploadImageHandler = (e) => {
        uploadImage.current.click();
        let formData = new FormData();
        formData.append('image', e.target.files[0]);

        setModalShow(true);
        setModalMessage('Are you sure you want to save these changes');
        setModalConfirm({
            function: () => {
                axios
                    .patch(`${BASE_URL}/products/${id}`, formData, {
                        headers: {
                            'auth-token': props.token,
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((res) => {
                        history.go(0);
                        // console.log(res.data.data);
                    })
                    .catch((err) => console.log(err));
                setModalShow(false);
            },
        });
        // history.go(0);
    };

    const updateInfoHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDesc);
        axios
            .patch(`${BASE_URL}/products/${id}`, formData, {
                headers: {
                    'auth-token': props.token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                history.go(0);
                // console.log(res.data.data);
                setModalShow(false);
            })
            .catch((err) => console.log(err));
    };
    console.log(productStock);
    console.log(productPrice);
    const updateStockPrice = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('stock', productStock);
        formData.append('price', productPrice);

        axios
            .patch(
                `${BASE_URL}/products/detail/${id}/${selectedSize}`,
                formData,
                {
                    headers: {
                        'auth-token': props.token,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then((res) => {
                history.go(0);
                // console.log(res.data.data);
                setModalShow(false);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        axios
            .get(`${BASE_URL}/products/detail/${id}`)
            .then((res) => {
                setProductDetail(res.data.data.result);
                setProductSize(res.data.data.sizeResult);
                setDeliveryMethod(res.data.data.d_methodResult);
                // console.log(res.data.data);
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (productSize) console.log(productSize);
    return (
        <div className='product-edit-container container-fluid'>
            <Breadcrumb
                item1={currentStuff.category}
                link1='/product'
                item2={productDetail && productDetail[0].name}
                link2={'/product/detail/' + id}
                item3={currentStuff.action}
                link3={0}
            />
            <Button
                variant='btn-prof-2 btn-product btn-order col-2 del-product'
                label='Delete'
                onClick={() => {
                    setModalShow(true);
                    setModalMessage(
                        'Are you sure want to delete this product?'
                    );
                    setModalConfirm({ function: deleteHandler });
                }}
            />
            <main className='row'>
                <aside className='col col-5 left-side'>
                    <div className='setting-product-image-section'>
                        <div
                            className='delete-button2'
                            onClick={() => {
                                setModalShow(true);
                                setModalMessage(
                                    'Are you sure want to delete this photo?'
                                );
                                setModalConfirm({
                                    function: deletePhotoHandler,
                                });
                            }}
                        >
                            <img
                                src={iconDelete}
                                alt='delete icon'
                                className='delete-icon2'
                            ></img>
                        </div>
                        <img
                            className='product-image-edit'
                            src={
                                productDetail &&
                                `${BASE_URL}${
                                    productDetail[0].icon ?? blankPhoto
                                }`
                            }
                            alt='product icon'
                        />
                    </div>
                    <div className='delivery-txt'>
                        Delivery only on{' '}
                        <b>{productDetail && productDetail[0].start_day}</b> to{' '}
                        <b>{productDetail && productDetail[0].end_day}</b> at{' '}
                        <b>
                            {productDetail && productDetail[0].start_hour} -{' '}
                            {productDetail && productDetail[0].end_hour}
                        </b>
                        <input
                            type='file'
                            id='image'
                            name='image'
                            accept='image/gif,image/jpeg,image/jpg,image/png'
                            ref={uploadImage}
                            style={{ display: 'none' }}
                            multiple=''
                            data-original-title='upload photos'
                            onChange={uploadImageHandler}
                        />
                        <Button
                            variant='btn-prof-3 btn-product btn-order'
                            label='Edit Image'
                            onClick={() => {
                                uploadImage.current.click();
                            }}
                        />
                    </div>
                </aside>
                <aside className='col col right-side'>
                    <InputField
                        type='text'
                        className='col'
                        classInput='edit-product-name'
                        value={
                            productName
                                ? productName
                                : productDetail && productDetail[0].name
                        }
                        onChange={(e) => {
                            setProductName(e.target.value);
                        }}
                    />
                    <InputField
                        type='number'
                        className='col'
                        classInput='edit-product-price prepend'
                        prepend='IDR'
                        value={
                            productPrice
                                ? productPrice
                                : productSize && productSize[selectedSize].price
                        }
                        onChange={(e) => {
                            setProductPrice(e.target.value);
                        }}
                    />
                    <InputField
                        type='textarea'
                        className='col'
                        classInput='edit-product-desc'
                        value={
                            productDesc
                                ? productDesc
                                : productDetail && productDetail[0].description
                        }
                        onChange={(e) => {
                            setProductDesc(e.target.value);
                        }}
                    />
                    <Dropdown
                        id='size_variant'
                        options={size}
                        display='name'
                        placeholder='Select Size'
                        selected={productSize}
                        onSelect={(e) => {
                            setSelectedSize(e[0].id);
                        }}
                    />
                    <Dropdown
                        id='deliv_method'
                        options={deliveryMethod2}
                        display='name'
                        placeholder='Select Delivery Methods'
                        selected={deliveryMethod}
                    />
                    <div className='stock-section'>
                        <NumericInput
                            min={1}
                            mobile={true}
                            value={
                                productSize &&
                                productSize[selectedSize - 1].stock
                            }
                            className='input-num-order col'
                            onChange={(e) => {
                                setProductStock(e);
                            }}
                            style={{ height: 'fit-content' }}
                        />
                        <Button
                            variant='btn-prof-1 btn-product btn-order col col-7'
                            label='Add to Cart'
                            onClick={() => {
                                setModalShow(true);
                                setModalMessage(
                                    'Are you sure want to save this change?'
                                );
                                setModalConfirm({ function: updateStockPrice });
                            }}
                        />
                    </div>
                    <Button
                        variant='btn-prof-2 btn-product btn-order'
                        label='Save'
                        onClick={() => {
                            setModalShow(true);
                            setModalMessage(
                                'Are you sure want to save this change?'
                            );
                            setModalConfirm({ function: updateInfoHandler });
                        }}
                    />
                </aside>
            </main>
            <Modal
                msg={modalMessage}
                show={modalShow}
                onHide={() => setModalShow(false)}
                btnvariant='btn-prof-2 outline col'
                btnlabel='Cancel'
                onConfirmation={modalConfirm.function}
                btnvariant2='btn-prof-2  col'
                btnlabel2="Yes, I'm Sure"
            />
        </div>
    );
}

// export default ProductEdit;
const mapStateToProps = (state) => {
    return { token: state.auth.results.token };
};
export default connect(mapStateToProps)(ProductEdit);
