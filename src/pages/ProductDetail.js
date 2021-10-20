import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Breadcrumb from '../components/UI/Breadcrumb';
// import sampleImage from '../assets/images/cold-brew.png';
import Modal from '../components/UI/Modal';
import Button from './../components/UI/Button';
import RectangleSelect from '../components/UI/RectangleSelect2';
import CircleSelect from '../components/UI/CircleSelect';
import NumericInput from 'react-numeric-input';
import iconCheckout from '../assets/images/arrow.png';
import iconDelete from '../assets/images/trash-icon.png';
import NotifAlert from '../components/UI/Notif';
import { connect } from 'react-redux';

import axios from 'axios';

function ProductDetail(props) {
    const { id } = useParams();
    const history = useHistory();

    const isAdmin = props.user.role_id===2? true:false;

    // console.log(id);
    const getCategoryName = {
        1: 'Coffee',
        2: 'Foods',
        3: 'Non-Coffee',
        4: 'Add-On',
    };

    const BASE_URL = `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}`;
    const [productDetail, setProductDetail] = useState();

    const [productSize, setProductSize] = useState();
    const [selectedSize, setSelectedSize] = useState(0);
    let availableSize;

    const [deliveryMethod, setDeliveryMethod] = useState(0);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(0);
    let availableMethod;

    const [timeReservation, setTimeReservation] = useState('');
    const [isNow, setIsNow] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [notifAlert, setNotifAlert] = useState({
        type: '',
        title: '',
        content: '',
        alertPop: false,
    });

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

    // TRANSACTION STATE
    const [addOrder, setAddOrder] = useState({
        qty: 1,
        id_product: id,
        id_size: selectedSize,
        id_delivery_method: selectedDeliveryMethod,
        time_reservation: timeReservation,
    });

    const [isOrder, setIsOrder] = useState(false);

    const addCartHandler = () => {
        if (addOrder.id_size === 0) {
            setNotifAlert({
                type: 'warning',
                title: 'Eitss..😝',
                content: 'Please select product size you want 😁',
                alertPop: true,
            });
        } else if (addOrder.id_delivery_method === 0) {
            setNotifAlert({
                type: 'warning',
                title: 'Eitss..😝',
                content: 'Please select delivery method you want 😁',
                alertPop: true,
            });
        } else if (addOrder.time_reservation === '') {
            setNotifAlert({
                type: 'warning',
                title: 'Eitss..😝',
                content: 'Please set time for reservation 😁',
                alertPop: true,
            });
        } else if (!isNow) {
            setNotifAlert({
                type: 'warning',
                title: 'Eitss..😝',
                content: 'Please fill in all field 😁',
                alertPop: true,
            });
        } else {
            setNotifAlert({
                type: 'success',
                title: 'Yeay 😀',
                content: `${addOrder.qty}x (${
                    productSize[addOrder.id_size - 1].name
                }) ${
                    productDetail && productDetail[0].name
                } has been added to your cart`,
                alertPop: true,
            });
            setIsOrder(true);
        }
    };

    const checkoutHandler = () => {
        // console.log(props.token);
        if (isOrder) {
            const orderData = {
                id_product: addOrder.id_product,
                quantity: addOrder.qty.toString(),
                id_size: addOrder.id_size,
                id_delivery_method: addOrder.id_delivery_method
            };
            console.log(orderData);
            axios
                .post(`${BASE_URL}/transaction`, orderData, {
                    headers: {
                        'auth-token': props.token,
                    },
                })
                .then((res) => {
                    console.log(res, 'sukses');
                    history.push('/orders');
                })
                .catch((err) => console.log('hah', err));
        }
    };

    const btnDelete = (
        <div className='delete-button'>
            <img
                src={iconDelete}
                alt='delete icon'
                className='delete-icon'
            ></img>
        </div>
    );

    if (productSize) {
        availableSize = productSize.map((item) => {
            return (
                <CircleSelect
                    key={item.id_size}
                    type='radio'
                    id={`size-${item.id_size}`}
                    value={item.id_size}
                    name='size-option'
                    label={item.name[0] === 'E' ? 'XL' : item.name[0]}
                    onChange={(e) => {
                        setSelectedSize(e.target.value - 1);
                        setAddOrder({ ...addOrder, id_size: e.target.value });
                        setNotifAlert({ ...notifAlert, alertPop: false });
                        console.log(e.target.value);
                    }}
                />
            );
        });
    }

    if (deliveryMethod) {
        availableMethod = deliveryMethod.map((item) => {
            console.log(item);
            return (
                <RectangleSelect
                    key={item.id_delivery_method}
                    type='radio'
                    id={`delivery-${item.id_delivery_method}`}
                    value={item.id_delivery_method}
                    name='deliv-option'
                    label={item.name}
                    onChange={(e) => {
                        setSelectedDeliveryMethod(e.target.value - 1);
                        setAddOrder({
                            ...addOrder,
                            id_delivery_method: e.target.value,
                        });
                        setNotifAlert({ ...notifAlert, alertPop: false });
                        console.log(e.target.value);
                    }}
                />
            );
        });
    }
    return (
        <div className='product-detail-container container-fluid'>
            {productDetail ? (
                <Breadcrumb
                    item1={
                        getCategoryName[productDetail[0].category_id] ??
                        'Uncategorized'
                    }
                    link1='/product'
                    item2={productDetail[0].name}
                    link2={0}
                />
            ) : null}

            <section className='product-detail-page top-section row'>
                <aside className='left-side col'>
                    <section className={`image-section ${isAdmin && 'admin'}`}>
                        <img
                            src={
                                productDetail &&
                                `${BASE_URL}${productDetail[0].icon}`
                            }
                            alt='product icon'
                            className='icon-product-detail'
                        />
                        {isAdmin && btnDelete}
                    </section>
                    <section className='time-method-summary card'>
                        <div className='title-section'>Delivery and Time</div>
                        <div className='delivery-option'>{availableMethod}</div>
                        <div className='order-now-confirm'>
                            <span className='label-confirm col-3'>Now</span>
                            <RectangleSelect
                                id='yes'
                                name='order-now'
                                label='Yes'
                                value='yes'
                                onChange={(e) => {
                                    setIsNow(e.target.value);

                                    setNotifAlert({
                                        ...notifAlert,
                                        alertPop: false,
                                    });
                                }}
                            />
                            <RectangleSelect
                                id='no'
                                value='no'
                                name='order-now'
                                label='No'
                                onChange={(e) => {
                                    setIsNow(e.target.value);

                                    setNotifAlert({
                                        ...notifAlert,
                                        alertPop: false,
                                    });
                                }}
                            />
                        </div>
                        <div className='set-time'>
                            <span className='label-confirm col-3'>
                                Set time
                            </span>
                            <input
                                type='date'
                                placeholder='time for reservation'
                                className='input-time-order'
                                required
                                onChange={(e) => {
                                    setTimeReservation(e.target.value);
                                    setAddOrder({
                                        ...addOrder,
                                        time_reservation: e.target.value,
                                    });
                                    setNotifAlert({
                                        ...notifAlert,
                                        alertPop: false,
                                    });
                                }}
                            />
                        </div>
                    </section>
                </aside>
                <aside className='right-side col'>
                    <div className='product-detail-name'>
                        {productDetail && productDetail[0].name}
                    </div>
                    <div className='product-detail-desc'>
                        {productDetail && productDetail[0].description}
                    </div>
                    <div className='product-detail-adverb'>
                        Delivery only on{' '}
                        <b>{productDetail && productDetail[0].start_day}</b> to{' '}
                        <b>{productDetail && productDetail[0].end_day}</b> at{' '}
                        <b>
                            {productDetail && productDetail[0].start_hour} -{' '}
                            {productDetail && productDetail[0].end_hour}
                        </b>
                    </div>
                    <div className='pricing'>
                        <div className='num-order'>
                            <NumericInput
                                min={1}
                                mobile={true}
                                value={addOrder.qty}
                                className='input-num-order'
                                onChange={(e) =>
                                    setAddOrder({
                                        ...addOrder,
                                        qty: e,
                                    })
                                }
                            />
                        </div>
                        <div className='product-price'>
                            IDR{' '}
                            {productSize &&
                                addOrder.qty * productSize[selectedSize].price}
                        </div>
                    </div>
                    {notifAlert.alertPop && (
                        <NotifAlert
                            variant={notifAlert.type}
                            onClose={() =>
                                setNotifAlert({
                                    ...notifAlert,
                                    alertPop: false,
                                })
                            }
                            title={notifAlert.title}
                            content={notifAlert.content}
                        />
                    )}
                    <Button
                        variant='btn-prof-2 btn-product btn-order'
                        label='Add to Cart'
                        onClick={addCartHandler}
                    />
                    <Button
                        variant='btn-prof-1 btn-product btn-order'
                        label={isAdmin ? 'Edit Product' : 'Ask a Staff'}
                        onClick={() =>
                            history.push(
                                isAdmin ? '/product/edit/' + id : '/chat'
                            )
                        }
                    />
                </aside>
            </section>
            <section className='product-detail-page bottom-section row'>
                <aside className='left-side col'>
                    <div className='size-variant card'>{availableSize}</div>
                </aside>
                <aside className='right-side col'>
                    <div className='order-summary card'>
                        <img
                            src={
                                productDetail &&
                                `${BASE_URL}${productDetail[0].icon}`
                            }
                            alt='icon product summary order'
                            className='icon-order-summary'
                        />
                        <div className='list-summary'>
                            <div className='name-product'>
                                {productDetail && productDetail[0].name}
                            </div>
                            <div className='order-list'>
                                <div className='list-item'>
                                    {isOrder
                                        ? `${addOrder.qty}x (${
                                              productSize[addOrder.id_size - 1]
                                                  .name
                                          })`
                                        : null}
                                </div>
                            </div>
                        </div>
                        <div className='checkout'>
                            <div className='checkout-label '>Checkout</div>
                            <div
                                className='checkout-button'
                                onClick={() => setModalShow(true)}
                            >
                                <img
                                    src={iconCheckout}
                                    alt='checkout icon'
                                    className='checkout-icon'
                                ></img>
                            </div>
                        </div>
                    </div>
                </aside>
            </section>
            <Modal
                msg="You won't eat the north end of a south bound bear. Stop thinking, start eating."
                show={modalShow}
                onHide={() => setModalShow(false)}
                btnvariant='btn-prof-2 outline col'
                btnlabel='Cancel'
                onConfirmation={checkoutHandler}
                btnvariant2='btn-prof-2  col'
                btnlabel2='Checkout Now🤤'
            />
        </div>
    );
}

// export default ProductDetail;
const mapStateToProps = (state) => {
    return { token: state.auth.results.token, user: state.user.results };
};
export default connect(mapStateToProps)(ProductDetail);
