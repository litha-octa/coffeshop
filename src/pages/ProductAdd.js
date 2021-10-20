import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../components/Product/ProductAdd.css';
import Breadcrumb from '../components/UI/Breadcrumb';
import Button from './../components/UI/Button';
import RectangleSelect from '../components/UI/RectangleSelect';
import CircleSelect from '../components/UI/CircleSelect';
import InputField from './../components/UI/InputFieldType1';
import blankPhoto from '../assets/images/blank-avatar.png';
import Modal from '../components/UI/Modal';
import NotifAlert from '../components/UI/Notif';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';

import axios from 'axios';
function ProductAdd(props) {
    const [modalShow, setModalShow] = useState(false);
    const BASE_URL = `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}`;

    // const { page } = useParams();
    const history = useHistory();
    // console.log(page);
    // fake data for test
    const getCategoryName = [
        { id: 1, name: 'Coffee' },
        { id: 2, name: 'Foods' },
        { id: 3, name: 'Non-Coffee' },
        { id: 4, name: 'Add-On' },
    ];
    const getSize = [
        { id: 1, name: 'Regular' },
        { id: 2, name: 'Large' },
        { id: 3, name: 'Extra Large' },
        { id: 4, name: '250gr' },
        { id: 5, name: '300gr' },
        { id: 6, name: '500gr' },
    ];

    const getDeliveryMethod = [
        { id: 1, name: 'Home Delivery' },
        { id: 2, name: 'Dine in' },
        { id: 3, name: 'Take away' },
    ];

    const currentStuff = {
        category: 'Favorite & Promo',
        action: 'Add new product',
    };

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setIconProduct({ ...iconProduct, content: imageSrc });
        iconValidate();

        setModalShow(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [webcamRef, setImgSrc]);

    const camera = (
        <>
            <Webcam
                style={{ width: '100%', height: 'auto' }}
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                mirrored={true}
                screenshotQuality={0.5}
            />
        </>
    );
    const [isDisabled, setIsDisabled] = useState(true);

    const [iconProduct, setIconProduct] = useState({
        content: null,
        isValid: false,
        alertPop: false,
        alertType: '',
        alertTitle: '',
        alertContent: '',
    });

    const iconValidate = () => {
        if (iconProduct.content === '') {
            setIconProduct({
                ...iconProduct,
                isValid: false,
                alertPop: true,
                type: 'warning',
                title: 'Please add Image',
                content:
                    'By adding images, your customers will be more interested',
            });
        } else {
            setIconProduct({ ...iconProduct, isValid: true, alertPop: false });
        }
    };

    const [productName, setProductName] = useState({
        content: '',
        isValid: false,
        alertPop: false,
        alertType: '',
        alertTitle: '',
        alertContent: '',
    });
    const nameValidate = () => {
        if (productName.content === '') {
            setProductName({
                ...productName,
                isValid: false,
                alertPop: true,
                alertType: 'warning',
                alertTitle: 'This field is required',
                alertContent: 'You must enter the product name ',
            });
        } else if (productName.content.length > 50) {
            setProductName({
                ...productName,
                isValid: false,
                alertPop: true,
                alertType: 'warning',
                alertTitle: 'This name is too long',
                alertContent:
                    'You can add more info in the description field. Use a short, concise, and clear name',
            });
        } else if (productName.content.length < 10) {
            setProductName({
                ...productName,
                isValid: false,
                alertPop: true,
                alertType: 'warning',
                alertTitle: 'This name is too short',
                alertContent: 'Use a representative name',
            });
        } else {
            setProductName({ ...productName, isValid: true, alertPop: false });
        }
    };

    const [productPrice, setProductPrice] = useState({
        content: '',
        isValid: false,
        alertPop: false,
    });
    const isValidNumber = (price) => {
        return !!price.match(/^[0-9]*$/);
    };
    const priceValidate = () => {
        if (productPrice.content === '') {
            setProductPrice({
                ...productPrice,
                isValid: false,
                alertPop: true,
                alertType: 'warning',
                alertTitle: 'This field is required',
                alertContent:
                    'You must fill in the product price. If this product is a free item, type 0 instead',
            });
        } else {
            setProductPrice({
                ...productPrice,
                isValid: true,
                alertPop: false,
            });
        }
    };
    const [productDescription, setProductDescription] = useState({
        content: '',
        isValid: false,
        alertPop: false,
    });
    const descValidate = () => {
        if (productDescription.content === '') {
            setProductDescription({
                ...productDescription,
                isValid: false,
                alertPop: true,
                alertType: 'warning',
                alertTitle: 'This field is required',
                alertContent:
                    'Description is important so that customers can find out information about this product',
            });
        } else if (productDescription.content.length < 50) {
            setProductDescription({
                ...productDescription,
                isValid: false,
                alertPop: true,
                alertType: 'warning',
                alertTitle: 'This is too short',
                alertContent:
                    'Please be nice to your customer. Let them know important things about this product',
            });
        } else {
            setProductDescription({
                ...productDescription,
                isValid: true,
                alertPop: false,
            });
        }
    };

    const [productCategory, setProductCategory] = useState({
        content: '',
        isValid: false,
        alertPop: false,
        alertType: '',
        alertTitle: '',
        alertContent: '',
    });

    console.log(productCategory.content);

    // const categoryValidate = () => {
    //     if (productCategory.content !== '')
    //         setProductCategory({
    //             ...productCategory,
    //             isValid: true,
    //             alertPop: false,
    //         });
    // };
    const [productStock, setProductStock] = useState({
        content: '',
        isValid: false,
        alertPop: false,
        alertType: '',
        alertTitle: '',
        alertContent: '',
    });

    const stockValidate = () => {
        if (!productStock.content) {
            setProductStock({
                ...productStock,
                isValid: false,
                alertPop: true,
                alertType: 'warning',
                alertTitle: 'This field is required',
                alertContent: 'Please type the stock of this product',
            });
        } else if (
            productStock.content !== '' &&
            Number(productStock.content) === 0
        ) {
            setProductStock({
                ...productStock,
                isValid: false,
                alertType: 'warning',
                alertTitle: 'Oh no no no 🤔',
                alertContent: "You can't sell a product that doesn't exist",
            });
        } else {
            setProductStock({
                ...productStock,
                isValid: true,
                alertPop: false,
            });
        }
    };

    const [productSize, setProductSize] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        isValid: false,
        alertPop: false,
        alertType: '',
        alertTitle: '',
        alertContent: '',
    });
    console.log(productSize[1]);
    console.log(productSize[2]);
    console.log(productSize[3]);

    // const sizeValidate = () => {
    //     if (
    //         productSize[1] ||
    //         productSize[2] ||
    //         productSize[3] ||
    //         productSize[4] ||
    //         productSize[5] ||
    //         productSize[6]
    //     ) {
    //         setProductSize({ ...productSize, isValid: true, alertPop: false });
    //     } else {
    //         setProductSize({
    //             ...productSize,
    //             isValid: false,
    //             alertPop: true,
    //             alertType: 'warning',
    //             alertTitle: 'This field is required',
    //             alertContent: 'Select at least one of product size below',
    //         });
    //     }
    // };
    const [productDeliveryMethod, setProductDeliveryMethod] = useState({
        1: false,
        2: false,
        3: false,
        isValid: false,
        alertPop: false,
        alertType: '',
        alertTitle: '',
        alertContent: '',
    });

    // const delivMethodValidate = () => {
    //     if (
    //         productDeliveryMethod[1] === true ||
    //         productDeliveryMethod[2] === true ||
    //         productDeliveryMethod[3] === true
    //     ) {
    //         setProductDeliveryMethod({
    //             ...productDeliveryMethod,
    //             isValid: false,
    //             alertPop: true,
    //             alertType: 'warning',
    //             alertTitle: 'This field is required',
    //             alertContent: 'Select at least one of product size below',
    //         });
    //     } else {
    //         setProductDeliveryMethod({
    //             ...productDeliveryMethod,
    //             isValid: true,
    //             alertPop: false,
    //         });
    //     }
    // };

    const [productHour, setProductHour] = useState({
        start: '',
        end: '',
        isValid: false,
        alertPop: false,
        alertType: '',
        alertTitle: '',
        alertContent: '',
    });

    const productHourValidate = () => {
        if (!productHour.start || !productHour.end) {
            setProductHour({
                ...productHour,
                isValid: false,
                alertPop: true,
                alertType: 'warning',
                alertTitle: 'This field is required',
                alertContent: 'Please set time when this product is available',
            });
        } else {
            setProductHour({ ...productHour, isValid: true, alertPop: false });
        }
    };

    const uploadImage = useRef(null);
    const uploadImageHandler = (e) => {
        uploadImage.current.click();
        // formData.append('image', e.target.files[0]);
        console.log(e.target.files[0]);
        setIconProduct({
            ...setIconProduct,
            content: e.target.files[0],
            isValid: true,
        });
        setImgSrc(URL.createObjectURL(e.target.files[0]));

        // history.go(0);
    };

    let availableCategory = getCategoryName.map((item) => (
        <RectangleSelect
            key={item.id}
            type='radio'
            id={`category-${item.id}`}
            name='category'
            label={item.name}
            value={item.id}
            onChange={(e) => {
                setProductCategory({
                    ...productCategory,
                    content: e.target.value,
                    isValid: true,
                });
            }}
        />
    ));
    console.log('tes', productCategory);

    let availableSize = getSize.map((item) => (
        <CircleSelect
            key={item.id}
            type='checkbox'
            id={`size-${item.id}`}
            name='size'
            label={
                item.name[0] === 'E'
                    ? 'XL'
                    : item.name.slice(3) === 'gr'
                    ? item.name
                    : item.name[0]
            }
            value={item.id}
            addClass={item.name.slice(3) === 'gr' ? 'variant-2' : ''}
            onChange={(e) => {
                setProductSize({
                    ...productSize,
                    [e.target.value]: e.target.checked,
                    isValid: true,
                });

                // sizeValidate();
            }}
        />
    ));
    console.log(productSize);
    let availableMethod = getDeliveryMethod.map((item) => (
        <RectangleSelect
            key={item.id}
            type='checkbox'
            id={`deliv-${item.id}`}
            name='delivery'
            label={item.name}
            value={item.id}
            onChange={(e) => {
                setProductDeliveryMethod({
                    ...productDeliveryMethod,
                    [e.target.value]: e.target.checked,
                    isValid: true,
                });

                // delivMethodValidate();
            }}
        />
    ));

    // const ref = useRef();
    // // console.log(productDeliveryMethod);
    // useEffect(() => {
    //     iconValidate();
    //     sizeValidate();
    //     delivMethodValidate();

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [iconProduct, productSize, productDeliveryMethod]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (
            iconProduct.isValid &&
            productName.isValid &&
            productPrice.isValid &&
            productDescription.isValid &&
            productCategory.isValid &&
            productStock.isValid &&
            productSize.isValid &&
            productDeliveryMethod.isValid &&
            productHour.isValid
        ) {
            setIsDisabled(false);
        }
    });

    const sizeList = [];
    if (productSize[1]) sizeList.push(1);
    if (productSize[2]) sizeList.push(2);
    if (productSize[3]) sizeList.push(3);
    if (productSize[4]) sizeList.push(4);
    if (productSize[5]) sizeList.push(5);
    if (productSize[6]) sizeList.push(6);
    // const size=
    const d_methodList = [];
    if (productDeliveryMethod[1]) d_methodList.push(1);
    if (productDeliveryMethod[2]) d_methodList.push(2);
    if (productDeliveryMethod[3]) d_methodList.push(3);
    // const d_method=d_methodList.join(',')

    function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(',');
        const byteString =
            splitDataURI[0].indexOf('base64') >= 0
                ? atob(splitDataURI[1])
                : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
        const dd = 'ima.jpg';
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i);

        return new Blob([ia], { name: dd, type: mimeString });
    }
    const saveProductHandler = (e) => {
        const file = DataURIToBlob(imgSrc);
        console.log(file);

        e.preventDefault();
        let formData = new FormData();
        formData.append(
            'image',
            iconProduct.content ? iconProduct.content : file
        );
        formData.append('name', productName.content);
        formData.append('description', productDescription.content);
        formData.append('category_id', productCategory.content);
        formData.append('start_hour', productHour.star);
        formData.append('end_hour', productHour.end);
        formData.append('stock', productStock.content);
        formData.append('price', productPrice.content);
        formData.append('size', sizeList.join(','));
        formData.append('d_method', d_methodList.join(','));
        axios
            .post(`${BASE_URL}/products`, formData, {
                headers: {
                    'auth-token': props.token,
                },
            })
            .then((res) => {
                console.log(res, 'sukses');
                history.push('/product');
            })
            .catch((err) => console.log('hah', err));
        // console.log(dataProduct);
    };

    return (
        <div className='product-edit-container product-add-container container-fluid'>
            <Breadcrumb
                item1={currentStuff.category}
                link1='/product'
                item2={currentStuff.action}
                link2={0}
            />

            <main className='row'>
                <aside className='col col-5 left-side'>
                    <section className='add-image-section'>
                        <div className='image-placeholder'>
                            <img
                                src={imgSrc ? imgSrc : blankPhoto}
                                alt='ava placeholder'
                                className='add-product-icon'
                            />
                        </div>

                        <Button
                            variant='btn-prof-4 btn-product btn-order btn-add-product'
                            label='Take a picture'
                            onClick={() => setModalShow(true)}
                        />
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
                            variant='btn-prof-1 btn-product btn-order btn-add-product'
                            label='Choose from gallery'
                            onClick={() => {
                                uploadImage.current.click();
                            }}
                        />
                    </section>

                    <section className='set-delivery-time-section'>
                        {/* <div className='label-create-product'>
                            Delivery Hour
                        </div> */}

                        <InputField
                            type='datetime-local'
                            ph='Select start hour'
                            classInput='input-product-form'
                            label='Start Delivery Time'
                            classLabel='label-create-product'
                            value={productHour.start}
                            onChange={(e) => {
                                setProductHour({
                                    ...productHour,
                                    start: e.target.value,
                                });
                            }}
                            onBlur={productHourValidate}
                            onClick={() =>
                                setProductHour({
                                    ...productHour,
                                    isValid: true,
                                    alertPop: false,
                                })
                            }
                        />
                        <InputField
                            type='datetime-local'
                            ph='Select end hour'
                            classInput='input-product-form'
                            label='End Delivery Time'
                            classLabel='label-create-product'
                            value={productHour.end}
                            onChange={(e) => {
                                setProductHour({
                                    ...productHour,
                                    end: e.target.value,
                                });
                            }}
                            onBlur={productHourValidate}
                            onClick={() => {
                                setProductHour({
                                    ...productHour,
                                    isValid: true,
                                });
                            }}
                        />
                        {productHour.isValid === false && productHour.alertPop && (
                            <NotifAlert
                                variant={productHour.alertType}
                                onClose={() =>
                                    setProductHour({
                                        ...productHour,
                                        alertPop: false,
                                    })
                                }
                                title={productHour.alertTitle}
                                content={productHour.alertContent}
                            />
                        )}
                    </section>
                    <section className='input-stock-section'>
                        <div className='label-create-product'>Input stock</div>

                        <InputField
                            type='text'
                            ph='Input stock'
                            classInput='input-product-form'
                            value={productStock.content}
                            onChange={(e) => {
                                isValidNumber(e.target.value) &&
                                    setProductStock({
                                        ...productStock,
                                        content: e.target.value,
                                    });
                            }}
                            onBlur={stockValidate}
                            onClick={() => {
                                setProductStock({
                                    ...productStock,
                                    isValid: true,
                                });
                            }}
                        />
                        {productStock.isValid === false &&
                            productStock.alertPop && (
                                <NotifAlert
                                    variant={productStock.alertType}
                                    onClose={() =>
                                        setProductStock({
                                            ...productStock,
                                            alertPop: false,
                                        })
                                    }
                                    title={productStock.alertTitle}
                                    content={productStock.alertContent}
                                />
                            )}
                    </section>
                </aside>
                <aside className='col col right-side'>
                    <section className='info-section'>
                        <InputField
                            label='Name:'
                            type='text'
                            ph='Type product name max. 50 characters '
                            classLabel='label-create-product'
                            classInput='input-product-form'
                            value={productName.content}
                            onChange={(e) => {
                                setProductName({
                                    ...productName,
                                    content: e.target.value,
                                });
                            }}
                            onBlur={nameValidate}
                            onClick={() => {
                                setProductName({
                                    ...productName,
                                    isValid: true,
                                });
                            }}
                        />
                        {productName.isValid === false && productName.alertPop && (
                            <NotifAlert
                                variant={productName.alertType}
                                onClose={() =>
                                    setProductName({
                                        ...productName,
                                        alertPop: false,
                                    })
                                }
                                title={productName.alertTitle}
                                content={productName.alertContent}
                            />
                        )}
                        <InputField
                            label='Price:'
                            type='text'
                            ph='Type the price'
                            classLabel='label-create-product'
                            classInput='input-product-form'
                            value={productPrice.content}
                            onChange={(e) => {
                                isValidNumber(e.target.value) &&
                                    setProductPrice({
                                        ...productPrice,
                                        content: e.target.value,
                                    });
                            }}
                            onBlur={priceValidate}
                            onClick={() => {
                                setProductPrice({
                                    ...productPrice,
                                    isValid: true,
                                });
                            }}
                        />
                        {productPrice.isValid === false &&
                            productPrice.alertPop && (
                                <NotifAlert
                                    variant={productPrice.alertType}
                                    onClose={() =>
                                        setProductPrice({
                                            ...productPrice,
                                            alertPop: false,
                                        })
                                    }
                                    title={productPrice.alertTitle}
                                    content={productPrice.alertContent}
                                />
                            )}
                        <InputField
                            label='Description:'
                            type='text'
                            ph='Describe your product min. 50 characters '
                            classLabel='label-create-product'
                            classInput='input-product-form'
                            value={productDescription.content}
                            onChange={(e) => {
                                setProductDescription({
                                    ...productDescription,
                                    content: e.target.value,
                                });
                            }}
                            onBlur={descValidate}
                            onClick={() => {
                                setProductDescription({
                                    ...productDescription,
                                    isValid: true,
                                });
                            }}
                        />

                        {productDescription.isValid === false &&
                            productDescription.alertPop && (
                                <NotifAlert
                                    variant={productDescription.alertType}
                                    onClose={() =>
                                        setProductDescription({
                                            ...productDescription,
                                            alertPop: false,
                                        })
                                    }
                                    title={productDescription.alertTitle}
                                    content={productDescription.alertContent}
                                />
                            )}
                    </section>
                    <section className='select-category-section'>
                        <div className='label-create-product'>Category</div>
                        <span className='additional-info'>
                            Select category of this product
                        </span>
                        <div className='check-section'>
                            {availableCategory}

                            {productCategory.isValid === false &&
                                productCategory.alertPop && (
                                    <NotifAlert
                                        variant={productCategory.alertType}
                                        onClose={() =>
                                            setProductCategory({
                                                ...productCategory,
                                                alertPop: false,
                                            })
                                        }
                                        title={productCategory.alertTitle}
                                        content={productCategory.alertContent}
                                    />
                                )}
                        </div>
                    </section>
                    <section className='select-product-size-section'>
                        <div className='label-create-product'>
                            Input product size
                        </div>
                        <span className='additional-info'>
                            Click size you want to use for this product
                        </span>
                        <div className='check-section'>{availableSize}</div>
                    </section>
                    <section className='select-delivery-method-section'>
                        <div className='label-create-product'>
                            Input delivery method
                        </div>
                        <span className='additional-info'>
                            Click methods you want to use for this product
                        </span>
                        <div className='check-section'>{availableMethod}</div>
                    </section>
                    <section className='confirm-button-section'>
                        <Button
                            variant='btn-prof-2 btn-product btn-order btn-add-product'
                            label='Save Product'
                            disabled={isDisabled}
                            onClick={saveProductHandler}
                        />
                        <Button
                            variant='btn-prof-5 btn-product btn-order btn-add-product'
                            label='Cancel'
                            disabled={isDisabled}
                        />
                    </section>
                </aside>
            </main>
            <Modal
                msg={camera}
                show={modalShow}
                onHide={() => setModalShow(false)}
                btnlabel='Cancel'
                btnvariant='btn-prof-2 outline col'
                onConfirmation={capture}
                btnvariant2='btn-prof-2  col'
                btnlabel2='Cheese 🤓'
            />
        </div>
    );
}

// export default ProductAdd;
const mapStateToProps = (state) => {
    return { token: state.auth.results.token };
};
export default connect(mapStateToProps)(ProductAdd);
